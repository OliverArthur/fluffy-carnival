type Subscription<S> = (state: S) => void

export interface Bloc<S> {
	getState: () => S
	setState: (state: S) => void
	observable: (obj: object, listener: Subscription<S>) => void
	unobservable: (obj: object) => void
}

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
