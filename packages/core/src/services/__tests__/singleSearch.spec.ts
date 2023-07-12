import axios from 'axios'
import { describe, it, expect } from '@jest/globals'
import singleSearchService from '../singleSearch'
import { createEither } from '../../common/Either'

jest.mock('axios')

describe('searchService', () => {
	it('returns shows correctly', async () => {
		const data = [{ id: 1, name: 'Show 1' }] as const
		;(axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data })

		const [search] = singleSearchService()
		const result = await search('query', 'episodes')

		expect(JSON.stringify(result)).toEqual(JSON.stringify(createEither.right(data)))
		expect(axios.get).toHaveBeenCalledWith('http://api.tvmaze.com/singlesearch/shows', {
			params: { q: 'query', embed: 'episodes' }
		})
	})

	it('handles errors correctly', async () => {
		const error = new Error('Error') as Error
		;(axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(error)

		const [search] = singleSearchService()
		const result = await search('query')

		expect(JSON.stringify(result)).toEqual(
			JSON.stringify(createEither.left({ kind: 'UnexpectedErrorException', error }))
		)
		expect(axios.get).toHaveBeenCalledWith('http://api.tvmaze.com/singlesearch/shows', {
			params: { q: 'query' }
		})
	})
})
