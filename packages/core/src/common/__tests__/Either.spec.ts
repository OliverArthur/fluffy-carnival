import { describe, it, expect } from '@jest/globals'
import { Either, createEither } from '../Either'

describe('Either', () => {
	it('should create a left instance correctly', () => {
		const leftValue = 'error'
		const either: Either<string, number> = createEither.left(leftValue)

		expect(either.isLeft()).toBe(true)
		expect(either.isRight()).toBe(false)
		expect(either.getLeft()).toBe(leftValue)
		expect(() => either.get()).toThrow()
		expect(either.getOrElse(0)).toBe(0)
	})

	it('should create a right instance correctly', () => {
		const rightValue = 42
		const either: Either<string, number> = createEither.right(rightValue)

		expect(either.isLeft()).toBe(false)
		expect(either.isRight()).toBe(true)
		expect(() => either.getLeft()).toThrow()
		expect(either.get()).toBe(rightValue)
		expect(either.getOrElse(0)).toBe(rightValue)
	})

	it('should perform fold operation correctly for left instance', () => {
		const leftValue = 'error'
		const either: Either<string, number> = createEither.left(leftValue)

		const foldResult = either.fold(
			(left) => `Left value: ${left}`,
			(right) => `Right value: ${right}`
		)

		expect(foldResult).toBe(`Left value: ${leftValue}`)
	})

	it('should perform fold operation correctly for right instance', () => {
		const rightValue = 42
		const either: Either<string, number> = createEither.right(rightValue)

		const foldResult = either.fold(
			(left) => `Left value: ${left}`,
			(right) => `Right value: ${right}`
		)

		expect(foldResult).toBe(`Right value: ${rightValue}`)
	})

	it('should perform map operation correctly for right instance', () => {
		const rightValue = 42
		const either: Either<string, number> = createEither.right(rightValue)

		const mappedEither = either.map((r) => r * 2)

		expect(mappedEither.isLeft()).toBe(false)
		expect(mappedEither.get()).toBe(rightValue * 2)
	})

	it('should perform map operation correctly for left instance', () => {
		const leftValue = 'error'
		const either: Either<string, number> = createEither.left(leftValue)

		const mappedEither = either.map((r) => r * 2)

		expect(mappedEither.isLeft()).toBe(true)
		expect(mappedEither.getLeft()).toBe(leftValue)
	})

	it('should perform flatMap operation correctly for right instance', () => {
		const rightValue = 42
		const either: Either<string, number> = createEither.right(rightValue)

		const flatMappedEither = either.flatMap((r) => createEither.right(r * 2))

		expect(flatMappedEither.isLeft()).toBe(false)
		expect(flatMappedEither.get()).toBe(rightValue * 2)
	})

	it('should perform flatMap operation correctly for left instance', () => {
		const leftValue = 'error'
		const either: Either<string, number> = createEither.left(leftValue)

		const flatMappedEither = either.flatMap((r) => createEither.right(r * 2))

		expect(flatMappedEither.isLeft()).toBe(true)
		expect(flatMappedEither.getLeft()).toBe(leftValue)
	})
})
