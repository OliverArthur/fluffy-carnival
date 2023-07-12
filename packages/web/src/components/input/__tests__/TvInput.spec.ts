import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { TvInput } from '@/components/input'

describe('TvInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TvInput, {
      props: {
        id: 'test-input',
        modelValue: 'Example value'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the input element', () => {
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('id')).toBe('test-input')
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('placeholder')).toBe('Placeholder')
    expect(input.attributes('disabled')).toBeUndefined()
    expect(input.attributes('readonly')).toBeUndefined()
    expect(input.attributes('required')).toBeUndefined()
    expect(input.attributes('maxlength')).toBeUndefined()
    expect(input.attributes('minlength')).toBeUndefined()
    expect(input.element.value).toBe('Example value')
  })

  it('emits the input event', async () => {
    const input = wrapper.find('input')
    await input.setValue('New value')
    expect(wrapper.emitted('on:input')).toBeTruthy()
    expect(wrapper.emitted('on:input')[0]).toEqual(['New value'])
  })

  it('emits the focus and blur events', async () => {
    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(wrapper.emitted('on:focus')).toBeTruthy()
    expect(wrapper.emitted('on:focus')[0]).toEqual(['Example value'])

    await input.trigger('blur')
    expect(wrapper.emitted('on:blur')).toBeTruthy()
    expect(wrapper.emitted('on:blur')[0]).toEqual(['Example value'])
  })
})
