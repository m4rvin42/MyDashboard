import React from 'react'

export default function VerticalStackPanel({ children, debug = false }) {
  return (
    <div
      className={`vertical-stack-panel${debug ? ' debug' : ''}`}
      data-testid="vertical-stack"
    >
      {React.Children.map(children, (child, idx) => (
        <div className="stack-child" key={idx}>
          {child}
        </div>
      ))}
    </div>
  )
}
