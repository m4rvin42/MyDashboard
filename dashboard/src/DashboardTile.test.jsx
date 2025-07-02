import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DashboardTile from './components/DashboardTile'

describe('DashboardTile', () => {
  it('applies alignment styles', () => {
    const { container } = render(
      <DashboardTile verticalContentAlignment="bottom" horizontalContentAlignment="center">
        <div>Child</div>
      </DashboardTile>
    )
    const tile = container.firstChild
    expect(tile).toHaveStyle({ justifyContent: 'flex-end', alignItems: 'center' })
  })
})
