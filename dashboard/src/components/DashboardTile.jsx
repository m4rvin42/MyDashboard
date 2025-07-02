import React from 'react'

const verticalMap = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
}

const horizontalMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
}

export default function DashboardTile({
  children,
  verticalContentAlignment,
  horizontalContentAlignment,
}) {
  const style = {}
  if (verticalContentAlignment) {
    style.justifyContent = verticalMap[verticalContentAlignment]
  }
  if (horizontalContentAlignment) {
    style.alignItems = horizontalMap[horizontalContentAlignment]
  }

  return (
    <div className="dashboard-tile" style={style}>
      {children}
    </div>
  )
}

