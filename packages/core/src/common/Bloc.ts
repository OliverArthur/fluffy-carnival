type Subscription<S> = (state: S) => void

/**
 * A generic interface for a state management object.
 *
 * @template S - The type of the state object.
 */
export interface Bloc<S> {
	/**
	 * Returns the current state object.
	 *
	 * @returns {S} The current state object.
	 */
	getState: () => S
	/**
	 * Sets the state object to the given value.
	 *
	 * @param {S} newState - The new state object.
	 */
	setState: (state: S) => void
	/**
	 * Adds a listener function to the given object that will be called whenever the state changes.
	 *
	 * @param {object} obj - The object to observe.
	 * @param {Subscription<S>} listener - The listener function to add.
	 */
	observable: (obj: object, listener: Subscription<S>) => void
	/**
	 * Removes the listener function from the given object.
	 *
	 * @param {object} obj - The object to unobserve.
	 */
	unobservable: (obj: object) => void
}

/**
 * Creates a new Bloc instance with the given initial state.
 * 
 * Note: Inspired by the BLoC pattern from Flutter, the BloC pattern is a way of managing state in a predictable manner.
 * by separating the business logic from the UI. The UI is responsible for displaying the state, while the business logic
 * is responsible for updating the state. The business logic is also responsible for handling any side effects, such as
 * making API calls, etc.
 * 
 * Observation: At the beginning, I started with Pinia, but I last minute I go with this approach. But I couldn't implement
 * whiten the component instead of using pinia store because the deadline for deliver the test exercise was close.
 *
 * @template S - The type of the state object.
 * @param {S} initialState - The initial state object.
 * @returns {Bloc<S>} A new Bloc instance.
 */
export const createBloc = <S extends object>(initialState: S): Bloc<S> => {
	const _listeners = new WeakMap<object, Subscription<S>>()
	const _listenerKeys = new Map<object, null>()

	const state = new Proxy(initialState, {
		set: (target, key, value) => {
			const newState = { ...target, [key]: value } as S
			Array.from(_listenerKeys.keys()).forEach((obj) => {
				const listener = _listeners.get(obj)
				if (listener) {
					listener(newState)
				} else {
					_listenerKeys.delete(obj)
				}
			})
			return Reflect.set(target, key, value)
		}
	})

	const getState = (): S => state
	const setState = (newState: S) => Object.assign(state, newState)
	const observable = (obj: object, listener: Subscription<S>): void => {
		_listeners.set(obj, listener)
		_listenerKeys.set(obj, null)
	}
	const unobservable = (obj: object): void => {
		_listeners.delete(obj)
		_listenerKeys.delete(obj)
	}

	return {
		getState,
		setState,
		observable,
		unobservable
	}
}
