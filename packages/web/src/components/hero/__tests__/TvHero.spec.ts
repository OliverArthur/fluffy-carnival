import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { TvHero } from '@/components/hero'

describe('TvHero', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TvHero, {
      slots: {
        default: '<h1>Hero content</h1>'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the content', () => {
    const content = wrapper.find('h1')
    expect(content.exists()).toBe(true)
    expect(content.text()).toBe('Hero content')
  })

  it('sets the background image', async () => {
    await wrapper.setProps({ bgCover: 'https://example.com/image.jpg' })
    const bg = wrapper.find('.hero__bg')
    expect(bg.exists()).toBe(true)
    expect(bg.attributes('style')).toContain('background-image: url(https://example.com/image.jpg)')
  })
})
