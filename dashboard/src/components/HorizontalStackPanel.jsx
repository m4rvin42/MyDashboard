import React from 'react'

export default function HorizontalStackPanel({ children, debug = false }) {
  return (
    <div
      className={`horizontal-stack-panel${debug ? ' debug' : ''}`}
      data-testid="horizontal-stack"
    >
      {React.Children.map(children, (child, idx) => (
        <div className="stack-child" key={idx}>
          {child}
        </div>
      ))}
    </div>
  )
}
