import { reactive, computed, readonly, watch } from 'vue'
import type { ComputedRef, DeepReadonly } from 'vue'
import { defineStore } from 'pinia'
import { singleSearchService } from '@showtimetv/core'
import type { Show, DataError } from '@showtimetv/core'

interface CommonState {
  query: string | null
  embed: string | null
}

interface LoadingShowState {
  kind: 'LoadingShowState'
}

interface LoadedShowState {
  kind: 'LoadedShowState'
  show: Show
}

interface ErrorShowState {
  kind: 'ErrorShowState'
  error: string
}

type State = (LoadingShowState | LoadedShowState | ErrorShowState) & CommonState

const searchInitialState: State = {
  kind: 'LoadingShowState',
  query: null,
  embed: null
}

const STORE_ID = 'SINGLE_SEARCH_SHOWS'

interface UseShowProps {
  state: DeepReadonly<State>
  getShows: ComputedRef<Show | undefined>
  isLoading: ComputedRef<boolean>
  hasError: ComputedRef<boolean>
  fetchShow: (query: string, embed: string) => Promise<void>
}

export const useSingleSearchShows = defineStore(STORE_ID, (): UseShowProps => {
  const state = reactive<State>(searchInitialState)

  const _handlerError = (query: string, embed: string, error: DataError): State => {
    switch (error.kind) {
      case 'UnexpectedErrorException': {
        return {
          kind: 'ErrorShowState',
          query,
          embed,
          error: 'Sorry, an unexpected error occurred, please try again later.'
        }
      }
    }
  }

  const getShows = computed(() => {
    if (state.kind === 'LoadedShowState') {
      return state.show
    }
    return null
  })

  const isLoading = computed(() => state.kind === 'LoadingShowState')
  const hasError = computed(() => state.kind === 'ErrorShowState')

  const fetchShow = async (query: string, embed: string): Promise<void> => {
    const [search] = singleSearchService()

    const showsResult = await search(query, embed)

    showsResult.fold(
      (errorMessage: DataError) => Object.assign(state, _handlerError(query, embed, errorMessage)),
      (show: Show) =>
        Object.assign(state, {
          kind: 'LoadedShowState',
          query: query,
					embed: embed,
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
    fetchShow
  }
})
