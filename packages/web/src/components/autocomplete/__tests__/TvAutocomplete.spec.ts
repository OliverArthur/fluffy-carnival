import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { TvAutocomplete } from '@components/autocomplete'

describe('TvAutocomplete', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TvAutocomplete, {
      props: {
        items: ['apple', 'banana', 'cherry']
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should render the input element', () => {
    expect(wrapper.find('#search-input').exists()).toBe(true)
  })

  it('should render the results list when the input is focused', async () => {
    const input = wrapper.find('#search-input')
    await input.trigger('focus')
    expect(wrapper.find('#results-list').exists()).toBe(true)
  })

  it('should filter the results based on the search term', async () => {
		const input = wrapper.find('#search-input')
		await input.setValue('a')
		input.element.value = 'a'
		await input.trigger('input')
		await new Promise((resolve) => setTimeout(resolve, 300));
		const results = wrapper.findAll('.list-item__button')
		expect(results).toHaveLength(2)
		expect(results[0].text()).toContain('apple')
		expect(results[1].text()).toContain('banana')
	})

	it('should select a result when it is clicked', async () => {
		const input = wrapper.find('#search-input')
		await input.setValue('a')
		input.element.value = 'a'
		await input.trigger('input')
		await new Promise((resolve) => setTimeout(resolve, 300));
		const result = wrapper.find('.list-item__button')
		if (result.exists()) {
			await result.trigger('click')
			expect(wrapper.emitted('on:submit')).toHaveLength(1)
			expect(wrapper.emitted('on:submit')[0]).toEqual(['apple'])
		} else {
			throw new Error('Result button not found')
		}
	})
})
