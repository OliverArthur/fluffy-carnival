import { DataError } from '../common/DataError'
import { createBloc } from '../common/Bloc'
import showService from '../services/show'

import type { Bloc } from '../common/Bloc'
import type { Show } from '../entities/Show'

interface commonState {
	id: number | null
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

type State = (LoadingShowState | LoadedShowState | ErrorShowState) & commonState

const showInitialState: State = {
	kind: 'LoadingShowState',
	id: null
}

export default function createShowBloc() {
	const bloc: Bloc<State> = createBloc(showInitialState)

	const _handlerError = (id: number, error: DataError): State => {
		switch (error.kind) {
			case 'UnexpectedErrorException': {
				return {
					kind: 'ErrorShowState',
					id,
					error: 'Sorry, an unexpected error occurred, please try again later.'
				}
			}
		}
	}

	const execute = async (id: number): Promise<void> => {
		bloc.setState({
			kind: 'LoadingShowState',
			id
		})

		const [getShow] = showService()
		const showResult = await getShow(id)

		showResult.fold(
			(errorMessage: DataError) => bloc.setState(_handlerError(id, errorMessage)),
			(show: Show) =>
				bloc.setState({
					kind: 'LoadedShowState',
					id,
					show
				})
		)
	}

	const getState = (): State => bloc.getState()
	const observable = (obj: object, listener: (state: State) => void): void =>
		bloc.observable(obj, listener)
	const unobservable = (obj: object): void => bloc.unobservable(obj)

	return [execute, getState, observable, unobservable] as const
}
