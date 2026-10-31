import type {
  HTMLAttributes,
  ReactNode,
} from 'react'

import './data-table-responsive.css'

export type DataTableAlignment =
  | 'left'
  | 'center'
  | 'right'

export interface DataTableColumn<T> {
  id: string
  header: string
  render: (row: T) => ReactNode
  align?: DataTableAlignment
  width?: string
}

interface DataTableProps<T>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  caption: string
  columns: readonly DataTableColumn<T>[]
  rows: readonly T[]
  getRowKey: (row: T, index: number) => string | number
  emptyMessage?: string
  compact?: boolean
}

function DataTable<T,>({
  caption,
  columns,
  rows,
  getRowKey,
  emptyMessage = 'No records available',
  compact = false,
  className = '',
  ...props
}: DataTableProps<T>) {
  const classes = [
    'fx-data-table',
    compact ? 'fx-data-table--compact' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (columns.length === 0) {
    return (
      <div {...props} className={classes}>
        <p
          className="fx-data-table__empty-message"
          role="status"
        >
          No columns are configured for this table.
        </p>
      </div>
    )
  }

  return (
    <div {...props} className={classes}>
      <table className="fx-data-table__table">
        <caption className="fx-data-table__caption">
          {caption}
        </caption>

        <thead className="fx-data-table__mobile-hidden">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={`fx-data-table__heading fx-data-table__heading--${column.align ?? 'left'}`}
                style={
                  column.width
                    ? { width: column.width }
                    : undefined
                }
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr
                key={getRowKey(row, index)}
                className="fx-data-table__row"
              >
                {columns.map((column) => (
                  <td
                    key={column.id}
                    data-label={column.header}
                    className={`fx-data-table__cell fx-data-table__cell--${column.align ?? 'left'}`}
                  >
                    <div className="fx-data-table__value">
                      {column.render(row)}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="fx-data-table__empty"
              >
                <span
                  className="fx-data-table__empty-message"
                  role="status"
                >
                  {emptyMessage}
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable