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

export default function VerticalStackPanel({ children }) {
  return (
    <div className="vertical-stack-panel" data-testid="vertical-stack">
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return null
        const {
          verticalContentAlignment = 'Top',
          horizontalContentAlignment = 'Center',
          ...rest
        } = child.props
        const style = {
          justifyContent: verticalMap[verticalContentAlignment],
          alignItems: horizontalMap[horizontalContentAlignment],
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
