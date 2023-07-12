import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { TvHeader } from '@/components/header'

describe('TvHeader', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TvHeader, {
      slots: {
        'burger-button': '<button>Burger button</button>',
        logo: '<span>Logo</span>',
        content: '<h1>Header content</h1>',
        actions: '<button>Action button</button>'
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the slots', () => {
    const burgerButton = wrapper.find('button')
    expect(burgerButton.exists()).toBe(true)
    expect(burgerButton.text()).toBe('Burger button')

    const logo = wrapper.find('span')
    expect(logo.exists()).toBe(true)
    expect(logo.text()).toBe('smart_display')

    const content = wrapper.find('h1')
    expect(content.exists()).toBe(true)
    expect(content.text()).toBe('Header content')

    const actionButton = wrapper.find('button:last-of-type')
    expect(actionButton.exists()).toBe(true)
    expect(actionButton.text()).toBe('Burger button')
  })

  it('sets the mode and modifier classes', async () => {
    await wrapper.setProps({ mode: 'sticky', modifier: 'compact' })
    expect(wrapper.classes()).toContain('header--sticky')
    expect(wrapper.classes()).toContain('header--compact')
  })
})
