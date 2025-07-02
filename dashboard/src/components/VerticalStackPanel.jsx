import React from 'react'
import ContentControl from './ContentControl'
import DashboardTile from './DashboardTile'

const verticalMap = {
  Top: 'flex-start',
  Center: 'center',
  Bottom: 'flex-end',
}

const horizontalMap = {
  Left: 'flex-start',
  Center: 'center',
  Right: 'flex-end',
}

export default function VerticalStackPanel({ children, debug = false }) {
  return (
    <div
      className={`vertical-stack-panel${debug ? ' debug' : ''}`}
      data-testid="vertical-stack"
    >
      {React.Children.map(children, (child, idx) => (
        <div className="stack-child" key={idx}>
          <DashboardTile>{child}</DashboardTile>
        </div>
      ))}

    </div>
  )
}
