import React from 'react'

export default function VerticalStackPanel({ children }) {
  return (
    <div className="vertical-stack-panel" data-testid="vertical-stack">
      {React.Children.map(children, (child, idx) => (
        <div className="stack-child" key={idx}>
          {child}
        </div>
      ))}
    </div>
  )
}
