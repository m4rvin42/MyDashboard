import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TimeWidget from './TimeWidget'

describe('TimeWidget', () => {
  it('forwards alignment props to ContentControl', () => {
    const { getByTestId } = render(
      <TimeWidget
        verticalContentAlignment="Bottom"
        horizontalContentAlignment="Right"
      />
    )
    const wrapper = getByTestId('time-widget').parentElement
    expect(wrapper).toHaveStyle({ justifyContent: 'flex-end', alignItems: 'flex-end' })
  })
})
