import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSearchShows } from '../useSearchShows'
describe('useSearchShows', () => {
	let store
	beforeEach(() => {
		setActivePinia(createPinia())
		store = useSearchShows()
	})

	afterEach(() => {
		store = null
	})

	it('should return empty array when no search term is provided', async () => {
		const result = await store.fetchShows('')
		expect(result).toBeUndefined()
	})

	it('should return shows when search term is provided', async () => {

		await store.fetchShows('Example show')

		expect(store.state.kind).toBe('LoadedShowState')
		expect(store.state.query).toBe('Example show')
		expect(store.hasError).toBeFalsy()
		expect(store.isLoading).toBeFalsy()
		expect(store.getShows).toBeTruthy()
		
	})
})
