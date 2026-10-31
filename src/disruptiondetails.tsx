import type { ReactNode } from 'react'

import './disruptiondetails.css'

interface DisruptionDetailsProps {
  shipment: string
  disruption: string
  destination: string
  quantity: string
  temperature: string
  deadline: string
  eventTime: string
  dataSource: string
  onContinue: () => void
}

function LedgerRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="incident-row">
      <span className="incident-row-label">
        {label}
      </span>

      <div className="incident-row-value">
        {children}
      </div>
    </div>
  )
}

function IncidentState({
  state,
  children,
}: {
  state: 'at-risk' | 'not-connected'
  children: ReactNode
}) {
  return (
    <span className={`incident-state incident-state--${state}`}>
      <span
        className="incident-state-mark"
        aria-hidden="true"
      />
      <span>{children}</span>
    </span>
  )
}

function UnknownValue() {
  return (
    <span className="incident-unknown">
      Unknown
    </span>
  )
}

function DisruptionDetails({
  shipment,
  disruption,
  destination,
  quantity,
  temperature,
  deadline,
  eventTime,
  onContinue,
}: DisruptionDetailsProps) {
  return (
    <main className="incident-page">
      <header className="incident-page-heading">
        <p className="incident-stage-label">
          STAGE 2 OF 5
        </p>

        <h1>Disruption Details</h1>

        <p className="incident-finding">
          The NH-44 road closure has put shipment {shipment}
          to {destination} at risk.
        </p>
      </header>

      <section
        className="incident-overview"
        aria-label="Shipment and disruption details"
      >
        <article className="incident-column">
          <div className="incident-section-heading">
            <h2>Shipment profile</h2>
            <p>
              Identity, destination and handling requirements for
              the affected cargo.
            </p>
          </div>

          <div className="incident-ledger">
            <LedgerRow label="Shipment reference">
              {shipment}
            </LedgerRow>

            <LedgerRow label="Cargo">
              Temperature-sensitive IV medicine
            </LedgerRow>

            <LedgerRow label="Quantity">
              {quantity}
            </LedgerRow>

            <LedgerRow label="Destination">
              {destination}
            </LedgerRow>

            <LedgerRow label="Temperature range">
              {temperature}
            </LedgerRow>

            <LedgerRow label="Delivery deadline">
              {deadline}
            </LedgerRow>
          </div>
        </article>

        <article className="incident-column">
          <div className="incident-section-heading">
            <h2>Disruption record</h2>
            <p>
              Reported event and the operational information
              currently available.
            </p>
          </div>

          <div className="incident-ledger">
            <LedgerRow label="Reported disruption">
              {disruption}
            </LedgerRow>

            <LedgerRow label="Affected route">
              NH-44
            </LedgerRow>

            <LedgerRow label="Reported at">
              {eventTime}
            </LedgerRow>

            <LedgerRow label="Event status">
              <IncidentState state="at-risk">
                Active
              </IncidentState>
            </LedgerRow>

            <LedgerRow label="Decision authority">
              Human approval required
            </LedgerRow>
          </div>
        </article>
      </section>

      <section className="incident-open-questions">
        <div className="incident-section-heading">
          <h2>Impact and information still required</h2>
          <p>
            The disruption is identified, but revised delivery
            estimates and route feasibility have not been evaluated.
          </p>
        </div>

        <div className="incident-ledger">
          <LedgerRow label="Shipment condition">
            <IncidentState state="at-risk">
              Delivery at risk
            </IncidentState>
          </LedgerRow>

          <LedgerRow label="Revised arrival estimate">
            <UnknownValue />
          </LedgerRow>

          <LedgerRow label="Calculated delivery delay">
            <UnknownValue />
          </LedgerRow>

          <LedgerRow label="Origin">
            <UnknownValue />
          </LedgerRow>

          <LedgerRow label="Additional cargo specifications">
            <UnknownValue />
          </LedgerRow>

          <LedgerRow label="Exact closure location">
            <UnknownValue />
          </LedgerRow>

          <LedgerRow label="Live traffic information">
            <IncidentState state="not-connected">
              Not connected
            </IncidentState>
          </LedgerRow>

          <LedgerRow label="Alternative route feasibility">
            <IncidentState state="not-connected">
              Not assessed
            </IncidentState>
          </LedgerRow>
        </div>
      </section>

      <section className="incident-next-step">
        <div>
          <h2>Recovery plan evaluation</h2>

          <p>
            Compare the candidate recovery strategies against delivery
            timing, inventory impact and configured requirements.
          </p>
        </div>

        <button
          type="button"
          className="incident-primary-button"
          onClick={onContinue}
        >
          Continue to Recovery Comparison
          <span aria-hidden="true">→</span>
        </button>
      </section>
    </main>
  )
}

export default DisruptionDetails