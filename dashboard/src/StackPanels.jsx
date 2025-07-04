export function VerticalStackPanel({ children, style, ...rest }) {
  const combinedStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    height: '100%',
    ...style,
  }
  return (
    <div style={combinedStyle} {...rest}>
      {children}
    </div>
  )
}

export function HorizontalStackPanel({ children, style, ...rest }) {
  const combinedStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    width: '100%',
    height: '100%',
    ...style,
  }
  return (
    <div style={combinedStyle} {...rest}>
      {children}
    </div>
  )
}

