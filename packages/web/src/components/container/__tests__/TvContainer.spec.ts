import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { TvContainer } from '@/components/container'

describe('TvContainer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TvContainer, {
      slots: {
        default: 'Example content'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the content', () => {
    const content = wrapper.text()
    expect(content).toContain('Example content')
  })

  it('sets the is-full-width class when isFullWidth prop is true', async () => {
    await wrapper.setProps({ isFullWidth: true })
    expect(wrapper.classes()).toContain('is-full-width')
  })
})
