import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { TvCard } from '@/components/card'

describe('TvCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TvCard, {
      props: {
        img: 'https://example.com/image.jpg',
        alt: 'Example image'
      },
      slots: {
        default: 'Example content'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the image and content', () => {
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/image.jpg')
    expect(img.attributes('alt')).toBe('Example image')

    const content = wrapper.text()
    expect(content).toContain('Example content')
  })
})
