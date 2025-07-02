import Dashboard from './components/Dashboard'
import './App.css'

export default function App() {
  const widgets = [
    { type: 'time', props: {} },
    { type: 'text', props: { text: 'Welcome to the dashboard!' } },
    { type: 'text', props: { text: 'Enjoy your stay.' } },
  ]

  return <Dashboard widgets={widgets} />
}
