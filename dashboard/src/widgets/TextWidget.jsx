import { useEffect } from 'react'

export default function TextWidget({ text = '' }) {
  useEffect(() => {
    console.log('TextWidget mounted with text:', text)
  }, [text])

  return <div data-testid="text-widget">{text}</div>
}
