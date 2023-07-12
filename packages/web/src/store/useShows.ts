import { reactive, computed, readonly } from 'vue'
import type { ComputedRef, DeepReadonly } from 'vue'
import { defineStore } from 'pinia'

import { showService } from '@showtimetv/core'
import type { Show, DataError } from '@showtimetv/core'

interface commonState {
	page: number | null
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

const showInitialState: State = {
	kind: 'LoadingShowState',
	page: null
}

const STORE_ID = 'SHOWS_LIST'

interface UseShowProps {
	state: DeepReadonly<State>
	getShows: ComputedRef<Show[] | undefined>
	isLoading: ComputedRef<boolean>
	hasError: ComputedRef<boolean>
	fetchShows: (page: number) => Promise<void>
}

export const useShows = defineStore(STORE_ID, (): UseShowProps => {
	const state = reactive<State>(showInitialState)

	const _handlerError = (page: number, error: DataError): State => {
		switch (error.kind) {
			case 'UnexpectedErrorException': {
				return {
					kind: 'ErrorShowState',
					page,
					error: 'Sorry, an unexpected error occurred, please try again later.'
				}
			}
		}
	}

	const getShows = computed(() => {
		if (state.kind === 'LoadedShowState') {
			return state.show
		}
		return []
	})

	const isLoading = computed(() => state.kind === 'LoadingShowState')
	const hasError = computed(() => state.kind === 'ErrorShowState')

	const fetchShows = async (page: number): Promise<void> => {
		const [getShow] = showService()

		const showsResult = await getShow(page)

		showsResult.fold(
			(errorMessage: DataError) => Object.assign(state, _handlerError(page, errorMessage)),
			(show: Show[]) =>
				Object.assign(state, {
					kind: 'LoadedShowState',
					page: page,
					show
				})
		)
	}

	return {
		state: readonly(state),
		getShows,
		isLoading,
		hasError,
		fetchShows
	}
})
