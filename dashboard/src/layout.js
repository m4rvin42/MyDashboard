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

export async function loadLayout() {
  try {
    const resp = await fetch('/api/layout')
    if (resp.ok) {
      return await resp.json()
    }
  } catch (err) {
    console.error('Failed to load layout from backend', err)
  }
  return defaultLayout
}

export async function saveLayout(layout) {
  try {
    await fetch('/api/layout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(layout),
    })
  } catch (err) {
    console.error('Failed to save layout to backend', err)
  }
}

