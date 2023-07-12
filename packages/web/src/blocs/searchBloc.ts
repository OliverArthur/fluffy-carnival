import { searchService, createBloc } from '@showtimetv/core'
import type { Show, DataError, Bloc } from '@showtimetv/core'


interface commonState {
	query: string
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
	query: null
}

export default function searchBloc() {
	const services = searchService()
	const bloc: Bloc<State> = createBloc(showInitialState)

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

	const fetchShows = async (query: string): Promise<void> => {
		bloc.setState({
			kind: 'LoadingShowState',
			query
		})

		const [search] = services
		const showsResult = await search(query)

		showsResult.fold(
			(errorMessage: DataError) => bloc.setState(_handlerError(query, errorMessage)),
			(show: Show[]) =>
				bloc.setState({
					kind: 'LoadedShowState',
					query,
					show
				})
		)
	}

	return {
		bloc,
		fetchShows
	}
}
