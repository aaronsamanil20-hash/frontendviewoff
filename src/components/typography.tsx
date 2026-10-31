import type {
  ElementType,
  HTMLAttributes,
} from 'react'

export type TypographyVariant =
  | 'display'
  | 'body'
  | 'eyebrow'
  | 'label'
  | 'metadata'
  | 'numeric'

interface TypographyProps
  extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  variant?: TypographyVariant
}

function Typography({
  as: Component = 'p',
  variant = 'body',
  className = '',
  ...props
}: TypographyProps) {
  const classes = [
    'fx-type',
    `fx-type--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Component
      {...props}
      className={classes}
    />
  )
}

export default Typography