import type {
  HTMLAttributes,
  ReactNode,
} from 'react'

import Typography from './typography'

interface PageHeaderProps
  extends HTMLAttributes<HTMLElement> {
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
}

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className = '',
  ...props
}: PageHeaderProps) {
  const classes = [
    'fx-page-header',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header
      {...props}
      className={classes}
    >
      <div className="fx-page-header__copy">
        <Typography
          as="span"
          variant="eyebrow"
          className="fx-page-header__eyebrow"
        >
          {eyebrow}
        </Typography>

        <Typography
          as="h1"
          variant="display"
          className="fx-page-header__title"
        >
          {title}
        </Typography>

        {description && (
          <Typography
            as="p"
            variant="body"
            className="fx-page-header__description"
          >
            {description}
          </Typography>
        )}
      </div>

      {actions && (
        <div className="fx-page-header__actions">
          {actions}
        </div>
      )}
    </header>
  )
}

export default PageHeader