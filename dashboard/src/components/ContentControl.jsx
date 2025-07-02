import React from 'react'

const verticalMap = {
  Top: 'flex-start',
  Center: 'center',
  Bottom: 'flex-end',
}

const horizontalMap = {
  Left: 'flex-start',
  Center: 'center',
  Right: 'flex-end',
}

export default function ContentControl({
  verticalContentAlignment = 'Top',
  horizontalContentAlignment = 'Center',
  children,
  ...rest
}) {
  const style = {
    display: 'flex',
    justifyContent: verticalMap[verticalContentAlignment],
    alignItems: horizontalMap[horizontalContentAlignment],
  }
  return (
    <div className="content-control" style={style} {...rest}>
      {children}
    </div>
  )
}
