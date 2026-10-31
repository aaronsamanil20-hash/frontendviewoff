import type {
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'destructive'

export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

function Button({
  variant = 'secondary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const buttonClasses = [
    'fx-button',
    `fx-button--${variant}`,
    `fx-button--${size}`,
    fullWidth ? 'fx-button--full' : '',
    loading ? 'fx-button--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      {...props}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <span
          className="fx-button__spinner"
          aria-hidden="true"
        />
      ) : leadingIcon ? (
        <span
          className="fx-button__icon"
          aria-hidden="true"
        >
          {leadingIcon}
        </span>
      ) : null}

      <span className="fx-button__label">
        {children}
      </span>

      {!loading && trailingIcon && (
        <span
          className="fx-button__icon"
          aria-hidden="true"
        >
          {trailingIcon}
        </span>
      )}
    </button>
  )
}

export default Button