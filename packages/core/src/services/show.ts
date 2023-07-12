import axios from 'axios'

import type { DataError } from '../common/DataError'
import { createEither } from '../common/Either'
import type { Show } from '../entities/Show'
import type { Either } from '../common/Either'

type ShowService = [(page: number) => Promise<Either<DataError, Show[]>>]

/**
 * Fetches the shows for the given page.
 *
 * @function
 * @name showService
 * @returns {ShowService} A tuple containing the getShow function.
 *
 */
export default function showService(): ShowService {
	const getShow = async (page: number): Promise<Either<DataError, Show[]>> => {
		try {
			const response = await axios.get('http://api.tvmaze.com/shows', {
				params: {
					page: page
				}
			})
			return createEither.right(response.data)
		} catch (error) {
			if (error instanceof Error) {
				return createEither.left({ kind: 'UnexpectedErrorException', error })
			}
			return createEither.left({
				kind: 'UnexpectedErrorException',
				error: new Error('Unknown error')
			})
		}
	}

	return [getShow]
}
