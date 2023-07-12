import { describe, it, expect } from '@jest/globals'
import { createBloc, Bloc } from '../Bloc'

describe('createBloc', () => {
	interface State {
		count: number
	}

	it('should initialize with the correct state', () => {
		const initialState: State = { count: 0 }
		const bloc: Bloc<State> = createBloc(initialState)
		expect(bloc.getState()).toEqual(initialState)
	})

	it('should update state correctly', () => {
		const initialState: State = { count: 0 }
		const bloc: Bloc<State> = createBloc(initialState)

		const newState: State = { count: 1 }
		bloc.setState(newState)

		expect(bloc.getState()).toEqual(newState)
	})

	it('should notify subscribers when state changes', () => {
		const initialState: State = { count: 0 }
		const bloc: Bloc<State> = createBloc(initialState)

		let notifiedState: State | null = null
		const subscriber = (state: State) => {
			notifiedState = state
		}

		const obj = {}
		bloc.observable(obj, subscriber)

		const newState: State = { count: 1 }
		bloc.setState(newState)

		expect(notifiedState).toEqual(newState)
	})

	it('should unsubscribe subscribers', () => {
		const initialState: State = { count: 0 }
		const bloc: Bloc<State> = createBloc(initialState)

		let notifiedState: State | null = null
		const subscriber = (state: State) => {
			notifiedState = state
		}

		const obj = {}
		bloc.observable(obj, subscriber)
		bloc.unobservable(obj)

		const newState: State = { count: 1 }
		bloc.setState(newState)

		expect(notifiedState).toBeNull()
	})
})
