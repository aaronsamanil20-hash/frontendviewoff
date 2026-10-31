import type {
  HTMLAttributes,
  ReactNode,
} from 'react'

interface MetricProps
  extends HTMLAttributes<HTMLElement> {
  label: string
  value: ReactNode
  unit?: ReactNode
  context?: ReactNode
  compact?: boolean
}

function Metric({
  label,
  value,
  unit,
  context,
  compact = false,
  className = '',
  ...props
}: MetricProps) {
  const classes = [
    'fx-metric',
    compact ? 'fx-metric--compact' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article
      {...props}
      className={classes}
    >
      <span className="fx-metric__label">
        {label}
      </span>

      <div className="fx-metric__value-group">
        <strong className="fx-metric__value">
          {value}
        </strong>

        {unit !== undefined && (
          <span className="fx-metric__unit">
            {unit}
          </span>
        )}
      </div>

      {context !== undefined && (
        <div className="fx-metric__context">
          {context}
        </div>
      )}
    </article>
  )
}

export default Metric