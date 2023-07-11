import { showService, createBloc } from '@showtimetv/core'
import type { Show, DataError, Bloc } from '@showtimetv/core'

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

export default function showBloc() {
	const services = showService()
	const bloc: Bloc<State> = createBloc(showInitialState)

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

	const fetchShows = async (page: number): Promise<void> => {
		bloc.setState({
			kind: 'LoadingShowState',
			page
		})

		const [getShows] = services
		const showsResult = await getShows(page)

		showsResult.fold(
			(errorMessage: DataError) => bloc.setState(_handlerError(page, errorMessage)),
			(show: Show[]) =>
				bloc.setState({
					kind: 'LoadedShowState',
					page,
					show
				})
		)
	}

	return {
		bloc,
		fetchShows
	}
}
