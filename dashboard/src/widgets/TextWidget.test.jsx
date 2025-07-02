import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TextWidget from './TextWidget'

describe('TextWidget', () => {
  it('forwards alignment props to ContentControl', () => {
    const { getByTestId } = render(
      <TextWidget
        text="Aligned"
        verticalContentAlignment="Center"
        horizontalContentAlignment="Left"
      />
    )
    const wrapper = getByTestId('text-widget').parentElement
    expect(wrapper).toHaveStyle({ justifyContent: 'center', alignItems: 'flex-start' })
  })
})
