import type {
  HTMLAttributes,
  ReactNode,
} from 'react'

export type PanelVariant =
  | 'default'
  | 'compact'
  | 'feature'

interface PanelProps extends HTMLAttributes<HTMLElement> {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
  variant?: PanelVariant
}

function Panel({
  header,
  footer,
  children,
  variant = 'default',
  className = '',
  ...props
}: PanelProps) {
  const panelClasses = [
    'fx-panel',
    variant !== 'default'
      ? `fx-panel--${variant}`
      : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section
      {...props}
      className={panelClasses}
    >
      {header !== undefined && (
        <div className="fx-panel__header">
          {header}
        </div>
      )}

      <div className="fx-panel__content">
        {children}
      </div>

      {footer !== undefined && (
        <div className="fx-panel__footer">
          {footer}
        </div>
      )}
    </section>
  )
}

export default Panel