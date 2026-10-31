import type { HTMLAttributes } from 'react'

export type StatusTone =
  | 'positive'
  | 'warning'
  | 'critical'
  | 'neutral'
  | 'unknown'

interface StatusPillProps
  extends HTMLAttributes<HTMLSpanElement> {
  label: string
  tone?: StatusTone
}

function StatusPill({
  label,
  tone = 'neutral',
  className = '',
  ...props
}: StatusPillProps) {
  const classes = [
    'fx-status',
    `fx-status--${tone}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      {...props}
      className={classes}
      data-status={tone}
    >
      <span
        className="fx-status__indicator"
        aria-hidden="true"
      />

      <span className="fx-status__label">
        {label}
      </span>
    </span>
  )
}

export default StatusPill