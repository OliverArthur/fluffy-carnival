import { reactive, computed, readonly, watch } from 'vue'
import type { ComputedRef, DeepReadonly } from 'vue'
import { defineStore } from 'pinia'

import { searchService } from '@showtimetv/core'
import type { Show, DataError } from '@showtimetv/core'

interface commonState {
	query: string | null
}

interface LoadingShowState {
	kind: 'LoadingShowState'
}

interface LoadedShowState {
	kind: 'LoadedShowState'
	show: Show[]
}

interface ErrorShowState {
	kind: 'ErrorShowState'
	error: string
}

type State = (LoadingShowState | LoadedShowState | ErrorShowState) & commonState

const searchInitialState: State = {
	kind: 'LoadingShowState',
	query: null
}

const STORE_ID = 'SEARCH_SHOWS'

interface UseShowProps {
	state: DeepReadonly<State>
	getShows: ComputedRef<Show[] | undefined>
	isLoading: ComputedRef<boolean>
	hasError: ComputedRef<boolean>
	fetchShows: (query: string) => Promise<void>
}

export const useSearchShows = defineStore(STORE_ID, (): UseShowProps => {
	const state = reactive<State>(searchInitialState)

	const _handlerError = (query: string, error: DataError): State => {
		switch (error.kind) {
			case 'UnexpectedErrorException': {
				return {
					kind: 'ErrorShowState',
					query,
					error: 'Sorry, an unexpected error occurred, please try again later.'
				}
			}
		}
	}

	const getShows = computed(() => {
		if (state.kind === 'LoadedShowState') {
			return state.show
		}
	})

	const isLoading = computed(() => state.kind === 'LoadingShowState')
	const hasError = computed(() => state.kind === 'ErrorShowState')

	const fetchShows = async (query: string): Promise<void> => {
		const [search] = searchService()

		const showsResult = await search(query)

		showsResult.fold(
			(errorMessage: DataError) => Object.assign(state, _handlerError(query, errorMessage)),
			(show: Show[]) =>
				Object.assign(state, {
					kind: 'LoadedShowState',
					query: query,
					show
				})
		)
	}

	watch(state, (newState) => {
		Object.assign(state, newState)
	}, { deep: true })

	return {
		state: readonly(state),
		getShows,
		isLoading,
		hasError,
		fetchShows
	}
})
