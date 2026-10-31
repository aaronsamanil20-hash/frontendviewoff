import type { HTMLAttributes } from 'react'

interface MissingValueProps
  extends HTMLAttributes<HTMLSpanElement> {
  label?: string
  detail?: string
}

function MissingValue({
  label = 'Not available',
  detail,
  className = '',
  ...props
}: MissingValueProps) {
  const classes = [
    'fx-missing-value',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      {...props}
      className={classes}
      data-state="unknown"
    >
      <span
        className="fx-missing-value__indicator"
        aria-hidden="true"
      >
        ?
      </span>

      <span className="fx-missing-value__content">
        <span className="fx-missing-value__label">
          {label}
        </span>

        {detail && (
          <span className="fx-missing-value__detail">
            {detail}
          </span>
        )}
      </span>
    </span>
  )
}

export default MissingValue