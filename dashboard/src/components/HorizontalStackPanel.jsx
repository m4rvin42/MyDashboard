import React from 'react'
import ContentControl from './ContentControl'

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

export default function HorizontalStackPanel({ children }) {
  return (
    <div className="horizontal-stack-panel" data-testid="horizontal-stack">
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return null
        const {
          verticalContentAlignment = 'Top',
          horizontalContentAlignment = 'Center',
          ...rest
        } = child.props
        return (
          <div className="stack-child" key={idx}>
            <ContentControl
              verticalContentAlignment={verticalContentAlignment}
              horizontalContentAlignment={horizontalContentAlignment}
            >
              {React.cloneElement(child, rest)}
            </ContentControl>
          </div>
        )
      })}
    </div>
  )
}
