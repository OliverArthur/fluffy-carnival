import axios from 'axios'

import type { DataError } from '../common/DataError'
import { createEither } from '../common/Either'
import type { Show } from '../entities/Show'
import type { Either } from '../common/Either'

export default function searchService() {
	const search = async (query: string): Promise<Either<DataError, Show[]>> => {
		try {
			const response = await axios.get('http://api.tvmaze.com/shows', {
				params: {
					q: query
				}
			})
			return createEither.right(response.data)
		} catch (error) {
			if (error instanceof Error) {
				return createEither.left({kind: 'UnexpectedErrorException', error})
			}
			return createEither.left({kind: 'UnexpectedErrorException', error: new Error('Unknown error')})
		}
	}

	return [search]
}
