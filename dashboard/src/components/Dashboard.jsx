import TimeWidget from '../widgets/TimeWidget'
import TextWidget from '../widgets/TextWidget'

const widgetMap = {
  time: TimeWidget,
  text: TextWidget,
}

export default function Dashboard({ widgets = [] }) {
  return (
    <div className="dashboard">
      {widgets.map((w, idx) => {
        const Widget = widgetMap[w.type] || (() => <div>Unknown widget</div>)
        return (
          <div className="widget" key={idx} data-testid="widget">
            <Widget {...w.props} />
          </div>
        )
      })}
    </div>
  )
}
