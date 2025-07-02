import React from 'react'

export default function HorizontalStackPanel({ children }) {
  return (
    <div className="horizontal-stack-panel" data-testid="horizontal-stack">
      {React.Children.map(children, (child, idx) => (
        <div className="stack-child" key={idx}>
          {child}
        </div>
      ))}
    </div>
  )
}
