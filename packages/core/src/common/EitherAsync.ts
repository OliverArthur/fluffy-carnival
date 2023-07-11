import { createEither } from './Either'
import type { Either } from './Either'

interface EitherAsync<L, R> {
	map: <T>(fn: (r: R) => T) => EitherAsync<L, T>
	flatMap: <T>(fn: (right: R) => Promise<Either<L, T>>) => EitherAsync<L, T>
	mapLeft: <U>(fn: (l: L) => U) => EitherAsync<U, R>
	flatMapLeft: <U>(fn: (left: L) => Promise<Either<U, R>>) => EitherAsync<U, R>
	run: () => Promise<Either<L, R>>
}

/**
 *
 * A factory function that creates an EitherAsync instance.
 * and follows the functional programming paradigm by creating a monad
 * that allows to chain operations that return a Promise of an Either instance.
 * where the left side of the Either instance is the error type and the right side
 * is the success type.
 *
 * @param promiseValue A function that returns a Promise of an Either instance.
 *
 * @returns An EitherAsync instance.
 */
export function createEitherAsync<L, R>(promiseValue: () => Promise<Either<L, R>>) {
	const map = <T>(fn: (r: R) => T): EitherAsync<L, T> =>
		flatMap(async (r) => createEither.right(fn(r)))

	const flatMap = <T>(fn: (right: R) => Promise<Either<L, T>>): EitherAsync<L, T> =>
		createEitherAsync(async () => {
			const value = await promiseValue()

			return value.fold(
				async (rightValue) => createEither.left(rightValue),
				(rightValue) => fn(rightValue)
			)
		})

	const mapLeft = <U>(fn: (l: L) => U): EitherAsync<U, R> =>
		flatMapLeft(async (l) => createEither.left(fn(l)))

	const flatMapLeft = <U>(fn: (left: L) => Promise<Either<U, R>>): EitherAsync<U, R> => {
		return createEitherAsync(async () => {
			const value = await promiseValue()

			return value.fold(
				(leftValue) => fn(leftValue),
				(rightValue) => Promise.resolve(createEither.right(rightValue))
			)
		})
	}

	const run = (): Promise<Either<L, R>> => promiseValue()

	return {
		map,
		flatMap,
		mapLeft,
		flatMapLeft,
		run
	}
}

createEitherAsync.fromEither = function <L, R>(value: Either<L, R>): EitherAsync<L, R> {
	return createEitherAsync(() => Promise.resolve(value))
}

createEitherAsync.fromPromise = function <L, R>(value: Promise<Either<L, R>>): EitherAsync<L, R> {
	return createEitherAsync(() => value)
}
