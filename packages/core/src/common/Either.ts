type Left<L> = { kind: 'left'; leftValue: L }
type Right<R> = { kind: 'right'; rightValue: R }

type EitherValue<L, R> = Left<L> | Right<R>

export interface Either<L, R> {
	isLeft: () => boolean
	isRight: () => boolean
	fold: <T>(leftFn: (left: L) => T, rightFn: (right: R) => T) => T
	map: <T>(fn: (r: R) => T) => Either<L, T>
	flatMap: <T>(fn: (right: R) => Either<L, T>) => Either<L, T>
	mapLeft: <T>(fn: (l: L) => T) => Either<T, R>
	flatMapLeft: <T>(fn: (left: L) => Either<T, R>) => Either<T, R>
	get: (errorMessage?: string) => R
	getOrThrow: (errorMessage?: string) => R
	getLeft: () => L
	getOrElse: (defaultValue: R) => R
}

/**
 * The function is a factory function that follows the functional programming paradigm
 * and creates a monad that allows to chain operations that return an Either instance.
 * where the left side of the Either instance is the error type and the right side
 * is the success type.
 * 
 * @param value The value to create the Either instance with.
 * 
 * @returns An Either instance with the given value.
 */
export function createEither<L, R>(value: EitherValue<L, R>) {
	const isLeft = (): boolean => value.kind === 'left'
	const isRight = (): boolean => value.kind === 'right'

	const fold = <T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T => {
		switch (value.kind) {
			case 'left':
				return leftFn(value.leftValue)
			case 'right':
				return rightFn(value.rightValue)
		}
	}

	const map = <T>(fn: (r: R) => T): Either<L, T> => flatMap((r) => createEither.right(fn(r)))
	const flatMap = <T>(fn: (right: R) => Either<L, T>): Either<L, T> =>
		fold(
			(leftValue) => createEither.left(leftValue),
			(rightValue) => fn(rightValue)
		)

	const mapLeft = <T>(fn: (l: L) => T): Either<T, R> => flatMapLeft((l) => createEither.left(fn(l)))
	const flatMapLeft = <T>(fn: (left: L) => Either<T, R>): Either<T, R> =>
		fold(
			(leftValue) => fn(leftValue),
			(rightValue) => createEither.right(rightValue)
		)

	const get = (errorMessage?: string): R => getOrThrow(errorMessage)
	const getOrThrow = (errorMessage?: string): R => {
		const throwFn = () => {
			throw Error(errorMessage || `An error has ocurred retrieving value: ${JSON.stringify(value)}`)
		}

		return fold(
			() => throwFn(),
			(rightValue) => rightValue
		)
	}

	const getLeft = (): L => {
		const throwFn = () => {
			throw Error('The value is right: ' + JSON.stringify(value))
		}

		return fold(
			(leftValue) => leftValue,
			() => throwFn()
		)
	}

	const getOrElse = (defaultValue: R): R =>
		fold(
			() => defaultValue,
			(someValue) => someValue
		)

	return {
		isLeft,
		isRight,
		fold,
		map,
		flatMap,
		mapLeft,
		flatMapLeft,
		get,
		getOrThrow,
		getLeft,
		getOrElse
	}
}

createEither.left = function <L, R>(value: L): Either<L, R> {
	return createEither({ kind: 'left', leftValue: value })
}

createEither.right = function <L, R>(value: R): Either<L, R> {
	return createEither({ kind: 'right', rightValue: value })
}
