import React from 'react'

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
        const style = {
          alignItems: verticalMap[verticalContentAlignment],
          justifyContent: horizontalMap[horizontalContentAlignment],
        }
        return (
          <div className="stack-child" style={style} key={idx}>
            {React.cloneElement(child, rest)}
          </div>
        )
      })}
    </div>
  )
}
