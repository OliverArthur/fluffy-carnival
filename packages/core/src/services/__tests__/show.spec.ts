import axios from 'axios'
import { describe, it, expect, jest } from '@jest/globals'
import showService from '../show'
import { createEither } from '../../common/Either'

jest.mock('axios')

describe('showService', () => {
	it('returns shows correctly', async () => {
		const page = 1
		const data = [
			{ id: 1, name: 'Show 1' },
			{ id: 2, name: 'Show 2' }
		] as const
		;(axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data })

		const [getShow] = showService()
		const result = await getShow(page)

		expect(JSON.stringify(result)).toEqual(JSON.stringify(createEither.right(data)))
		expect(axios.get).toHaveBeenCalledWith('http://api.tvmaze.com/shows', { params: { page } })
	})

	it('handles errors correctly', async () => {
		const page = 1
		const error = new Error('Error') as Error
		;(axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(error)

		const [getShow] = showService()
		const result = await getShow(page)

		expect(JSON.stringify(result)).toEqual(
			JSON.stringify(createEither.left({ kind: 'UnexpectedErrorException', error }))
		)
		expect(axios.get).toHaveBeenCalledWith('http://api.tvmaze.com/shows', { params: { page } })
	})
})
