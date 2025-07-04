export default function StringWidget({ text }) {
  const style = {
    border: '1px solid #888',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  }
  return (
    <div style={style}>{text}</div>
  )
}
