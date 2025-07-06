export default function StringWidget({
  text,
  fontSize = '1rem',
  textColor = 'blue',
  backgroundColor = 'yellow',
  showBorder = true,
} = {}) {
  const style = {
    border: showBorder ? '1px solid #888' : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: textColor,
    backgroundColor,
    fontSize,
    width: '100%',
    height: '100%',
  }
  return (
    <div style={style}>{text}</div>
  )
}
