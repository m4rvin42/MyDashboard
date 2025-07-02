import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('renders widgets', () => {
    render(<App />)
    expect(screen.getByTestId('time-widget')).toBeInTheDocument()
    const texts = screen.getAllByTestId('text-widget')
    expect(texts.length).toBe(2)
  })
})
