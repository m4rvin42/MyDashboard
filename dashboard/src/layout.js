export const defaultLayout = {
  type: 'vertical',
  children: [
    {
      type: 'horizontal',
      children: [
        { type: 'widget', widget: 'DateTimeWidget' },
        { type: 'widget', widget: 'StringWidget', props: { text: 'Hello from StringWidget' } },
      ],
      style: { flex: 1 }
    },
    {
      type: 'horizontal',
      children: [
        { type: 'widget', widget: 'TestWidget' },
        { type: 'widget', widget: 'TestWidget' },
        { type: 'widget', widget: 'TestWidget' },
      ],
      style: { flex: 1 }
    },
    {
      type: 'horizontal',
      children: [
        { type: 'widget', widget: 'TestWidget' },
        { type: 'widget', widget: 'TestWidget' },
        { type: 'widget', widget: 'TestWidget' },
      ],
      style: { flex: 1 }
    },
    {
      type: 'horizontal',
      children: [
        { type: 'widget', widget: 'MailWidget' },
      ],
      style: { flex: 1 }
    }
  ]
}

export function loadLayout() {
  try {
    const data = localStorage.getItem('layout')
    if (data) {
      return JSON.parse(data)
    }
  } catch (err) {
    console.error('Failed to parse layout from localStorage', err)
  }
  return defaultLayout
}

export function saveLayout(layout) {
  try {
    localStorage.setItem('layout', JSON.stringify(layout))
  } catch (err) {
    console.error('Failed to save layout', err)
  }
}

