import { useState } from 'react'
import { loadLayout, saveLayout } from './layout.js'
import { useNavigate } from 'react-router-dom'

export default function ConfigPage() {
  const navigate = useNavigate()
  const [text, setText] = useState(
    JSON.stringify(loadLayout(), null, 2)
  )

  function handleSave() {
    try {
      const layout = JSON.parse(text)
      saveLayout(layout)
      navigate('/')
    } catch (err) {
      alert('Invalid JSON: ' + err.message)
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Configure Layout</h1>
      <textarea
        style={{ width: '100%', height: '300px' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  )
}
