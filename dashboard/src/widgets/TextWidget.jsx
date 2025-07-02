import { useEffect } from 'react'
import ContentControl from '../components/ContentControl'

export default function TextWidget({
  text = '',
  verticalContentAlignment,
  horizontalContentAlignment,
}) {
  useEffect(() => {
    console.log('TextWidget mounted with text:', text)
  }, [text])

  return (
    <ContentControl
      verticalContentAlignment={verticalContentAlignment}
      horizontalContentAlignment={horizontalContentAlignment}
    >
      <div data-testid="text-widget">{text}</div>
    </ContentControl>
  )
}
