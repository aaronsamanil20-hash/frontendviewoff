import { useId } from 'react'

import type {
  HTMLAttributes,
  ReactNode,
} from 'react'

interface SectionProps
  extends HTMLAttributes<HTMLElement> {
  eyebrow?: string
  title?: string
  description?: string
  action?: ReactNode
  children: ReactNode
}

function Section({
  eyebrow,
  title,
  description,
  action,
  children,
  className = '',
  ...props
}: SectionProps) {
  const headingId = useId()

  const classes = [
    'fx-section',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const hasHeading =
    Boolean(eyebrow || title || description || action)

  return (
    <section
      {...props}
      className={classes}
      aria-labelledby={title ? headingId : undefined}
    >
      {hasHeading && (
        <div className="fx-section__header">
          <div className="fx-section__copy">
            {eyebrow && (
              <span className="fx-section__eyebrow">
                {eyebrow}
              </span>
            )}

            {title && (
              <h2
                id={headingId}
                className="fx-section__title"
              >
                {title}
              </h2>
            )}

            {description && (
              <p className="fx-section__description">
                {description}
              </p>
            )}
          </div>

          {action && (
            <div className="fx-section__action">
              {action}
            </div>
          )}
        </div>
      )}

      <div className="fx-section__content">
        {children}
      </div>
    </section>
  )
}

export default Section