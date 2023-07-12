import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { TvButton } from '@/components/button'


describe('TvButton', () => {

	let wrapper

	beforeEach(() => {
		wrapper = mount(TvButton, {
			slots: {
				default: 'Click me!'
			}
		})
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the button element', () => {
		expect(wrapper.find('button').exists()).toBe(true)
	})

	it('should render the label', () => {
		expect(wrapper.find('button').text()).toBe('Click me!')
	})

	it('should emit an event when clicked', async () => {
		await wrapper.trigger('click')
		expect(wrapper.emitted('onPressed')).toHaveLength(1)
	})

	it('should not emit an event when disabled', async () => {
		await wrapper.setProps({ disabled: true })
		await wrapper.trigger('click')
		expect(wrapper.emitted('onPressed')).toBeUndefined()
	})

	describe('Button props', () => {

		beforeEach(() => {
			wrapper = mount(TvButton, {
				props: {
					size: 'sm',
					theme: 'primary',
					type: 'button',
					variant: 'solid'
				}
			})
		})

		it('should render the button with the correct size', () => {
			expect(wrapper.find('button').classes()).toContain('button--sm')
		})

		it('should render the button with the correct theme', () => {
			expect(wrapper.find('button').classes()).toContain('button--primary')
		})

		it('should render the button with the correct type', () => {
			expect(wrapper.find('button').attributes('type')).toBe('button')
		})

		it('should render the button with the correct variant', () => {
			expect(wrapper.find('button').classes()).toContain('button--solid')
		})
	})
})
