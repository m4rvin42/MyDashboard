import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('renders widgets', () => {
    render(<App />)
    expect(screen.getByTestId('vertical-stack')).toBeInTheDocument()
    expect(screen.getByTestId('horizontal-stack')).toBeInTheDocument()
    expect(screen.getByTestId('time-widget')).toBeInTheDocument()
    const texts = screen.getAllByTestId('text-widget')
    expect(texts.length).toBe(3)

    const timeParent = screen.getByTestId('time-widget').parentElement
    expect(timeParent).toHaveClass('content-control')
    expect(timeParent).toHaveStyle({
      justifyContent: 'flex-start',
      alignItems: 'center',
    })

    const [topLeft, centered, bottomRight] = texts.map((t) => t.parentElement)
    expect(topLeft).toHaveStyle({ justifyContent: 'flex-start', alignItems: 'flex-start' })
    expect(centered).toHaveStyle({ justifyContent: 'center', alignItems: 'center' })
    expect(bottomRight).toHaveStyle({ justifyContent: 'flex-end', alignItems: 'flex-end' })
  })
})
