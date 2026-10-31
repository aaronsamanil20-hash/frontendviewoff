import type {
  HTMLAttributes,
  ReactNode,
} from 'react'

interface FieldRowProps
  extends HTMLAttributes<HTMLDivElement> {
  label: string
  value: ReactNode
  hint?: ReactNode
  valueTone?: 'default' | 'muted'
}

function FieldRow({
  label,
  value,
  hint,
  valueTone = 'default',
  className = '',
  ...props
}: FieldRowProps) {
  const classes = [
    'fx-field-row',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      {...props}
      className={classes}
    >
      <div className="fx-field-row__main">
        <span className="fx-field-row__label">
          {label}
        </span>

        <div
          className={`fx-field-row__value fx-field-row__value--${valueTone}`}
        >
          {value}
        </div>
      </div>

      {hint !== undefined && (
        <div className="fx-field-row__hint">
          {hint}
        </div>
      )}
    </div>
  )
}

export default FieldRow