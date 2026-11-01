import { useEffect, useState, type ReactNode } from 'react'
import {
  Building2,
  Package,
  Route,
} from 'lucide-react'

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

type UpdateInterval = '30' | '60' | '300' | '900'

interface UpdateSettings {
  enabled: boolean
  interval: UpdateInterval
}

const UPDATE_SETTINGS_KEY = 'foresightx.disruption-details.update-settings'

function readUpdateSettings(): UpdateSettings {
  const defaults: UpdateSettings = { enabled: true, interval: '60' }

  if (typeof window === 'undefined') return defaults

  try {
    const stored = window.localStorage.getItem(UPDATE_SETTINGS_KEY)
    if (!stored) return defaults

    const parsed: unknown = JSON.parse(stored)
    if (typeof parsed !== 'object' || parsed === null) return defaults

    const saved = parsed as { enabled?: unknown; interval?: unknown }
    const intervals: UpdateInterval[] = ['30', '60', '300', '900']

    return {
      enabled: typeof saved.enabled === "boolean"
        ? saved.enabled
        : defaults.enabled,
      interval: intervals.includes(saved.interval as UpdateInterval)
        ? (saved.interval as UpdateInterval)
        : defaults.interval,
    }
  } catch {
    return defaults
  }
}

function AgentSource({
  agents,
  description,
}: {
  agents: string
  description?: string
}) {
  return (
    <div className="incident-agent-source">
      <span className="incident-agent-light" aria-hidden="true" />
      <span className="incident-agent-name">{agents}</span>
      {description ? (
        <span className="incident-agent-description">
          {description}
        </span>
      ) : null}
    </div>
  )
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
      <span className="incident-row-label">{label}</span>
      <div className="incident-row-value">{children}</div>
    </div>
  )
}

function IncidentState({
  state,
  children,
}: {
  state: 'at-risk' | 'not-connected' | 'active-reported'
  children: ReactNode
}) {
  return (
    <span className={`incident-state incident-state--${state}`}>
      <span className="incident-state-mark" aria-hidden="true" />
      <span>{children}</span>
    </span>
  )
}

function UnknownValue() {
  return <span className="incident-unknown">Unknown</span>
}

function IncidentTrace({
  disruption,
  shipment,
  destination,
}: {
  disruption: string
  shipment: string
  destination: string
}) {
  return (
    <section
      className="incident-trace"
      aria-label="Incident relationship"
    >
      <div className="incident-trace-heading">
        <span>INCIDENT PATH</span>
      </div>

      <div className="incident-trace-track">
        <article
          className="incident-trace-node"
          data-tone="critical"
        >
          <div className="incident-trace-icon">
            <Route size={19} strokeWidth={1.6} />
          </div>

          <div className="incident-trace-copy">
            <span>REPORTED DISRUPTION</span>
            <strong>{disruption}</strong>
            <small>Reported event</small>
          </div>
        </article>

        <span className="incident-trace-connector" aria-hidden="true">
          <span />
        </span>

        <article
          className="incident-trace-node"
          data-tone="warning"
        >
          <div className="incident-trace-icon">
            <Package size={19} strokeWidth={1.6} />
          </div>

          <div className="incident-trace-copy">
            <span>AFFECTED SHIPMENT</span>
            <strong>{shipment}</strong>
            <small>Delivery at risk</small>
          </div>
        </article>

        <span className="incident-trace-connector" aria-hidden="true">
          <span />
        </span>

        <article
          className="incident-trace-node"
          data-tone="neutral"
        >
          <div className="incident-trace-icon">
            <Building2 size={19} strokeWidth={1.6} />
          </div>

          <div className="incident-trace-copy">
            <span>DESTINATION</span>
            <strong>{destination}</strong>
            <small>Delivery commitment</small>
          </div>
        </article>
      </div>
    </section>
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
  dataSource,
  onContinue,
}: DisruptionDetailsProps) {
  const [updateSettings, setUpdateSettings] = useState<UpdateSettings>(readUpdateSettings)

  useEffect(() => {
    try {
      window.localStorage.setItem(
        UPDATE_SETTINGS_KEY,
        JSON.stringify(updateSettings),
      )
    } catch {
      // The page remains usable when browser storage is unavailable.
    }
  }, [updateSettings])

  return (
    <main className="incident-page">
      {/* INTRODUCTION */}

      <header className="incident-page-heading">
        <div className="incident-heading-topline">
          <p className="incident-stage-label">
            STAGE 02 / 05
          </p>

        </div>

        <h1>Disruption Details</h1>

        <section className="incident-brief" aria-label="Incident summary">
  <div className="incident-brief-status">
    <span className="incident-brief-led" aria-hidden="true" />
    <span>CONFIRMED IMPACT</span>
  </div>

  <h2>{disruption}</h2>

  <p>
    The reported disruption may affect shipment{' '}
    <strong>{shipment}</strong>{' '}
    en route to <strong>{destination}</strong>.
  </p>

  <div className="incident-brief-footer">
    <span>Impact confirmed in Control Tower</span>
  </div>
</section>
      </header>

      <section
        className="incident-update-control"
        aria-labelledby="incident-update-title"
      >
        <div className="incident-update-copy">
          <h2 id="incident-update-title">Automatic updates</h2>
          <p>
            Choose how often FORESIGHTX should check for refreshed shipment
            and disruption information once a live data connection is integrated.
          </p>
        </div>

        <div className="incident-update-controls">
          <label className="incident-update-enable">
            <input
              type="checkbox"
              checked={updateSettings.enabled}
              onChange={(event) =>
                setUpdateSettings((current) => ({
                  ...current,
                  enabled: event.target.checked,
                }))
              }
            />
            <span>Enable automatic updates</span>
          </label>

          <label className="incident-update-interval">
            <span>Refresh interval</span>
            <select
              value={updateSettings.interval}
              onChange={(event) =>
                setUpdateSettings((current) => ({
                  ...current,
                  interval: event.target.value as UpdateInterval,
                }))
              }
              disabled={!updateSettings.enabled}
            >
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="300">5 minutes</option>
              <option value="900">15 minutes</option>
            </select>
          </label>
        </div>

        <div className="incident-update-status" role="status" aria-live="polite">
          <span
            className="incident-update-light"
            data-enabled={updateSettings.enabled}
            aria-hidden="true"
          />
          <span>
            {updateSettings.enabled
              ? "Preference enabled. Waiting for data integration."
              : "Automatic updates are paused."}
          </span>
          <span className="incident-update-connection">
            Data connection pending
          </span>
        </div>
      </section>

      {/* INCIDENT TRACE */}

      <IncidentTrace
        disruption={disruption}
        shipment={shipment}
        destination={destination}
      />

      {/* SHIPMENT AND DISRUPTION OVERVIEW */}

      <section
        className="incident-overview"
        aria-label="Shipment and disruption details"
      >
        <article className="incident-column">
          <div className="incident-section-heading">
            <div>
              <h2>Shipment profile</h2>
              <p>
                Identity, destination and handling requirements
                for the affected cargo.
              </p>
            </div>

            <AgentSource
              agents="INVENTORY · COMPLIANCE"
              description="AGENT CONTEXT"
            />
          </div>

          <div className="incident-ledger">
            <LedgerRow label="Shipment reference">
              <strong className="incident-shipment-reference">
                {shipment}
              </strong>
            </LedgerRow>

            <LedgerRow label="Cargo">
              Temperature sensitive IV medicine
            </LedgerRow>

            <LedgerRow label="Quantity">
              {quantity}
            </LedgerRow>

            <LedgerRow label="Destination">
              {destination}
            </LedgerRow>

            <LedgerRow label="Temperature range">
              <strong className="incident-priority-value">
                {temperature}
              </strong>
            </LedgerRow>

            <LedgerRow label="Delivery deadline">
              <strong className="incident-priority-value">
                {deadline}
              </strong>
            </LedgerRow>
          </div>
        </article>

        <article className="incident-column">
          <div className="incident-section-heading">
            <div>
              <h2>Disruption record</h2>
              <p>
                Reported event and the operational information
                currently available.
              </p>
            </div>

            <AgentSource
              agents="SENSING AGENT"
            />
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
              <IncidentState state="active-reported">
                Active
              </IncidentState>
            </LedgerRow>

            <LedgerRow label="Data source">
              {dataSource}
            </LedgerRow>

            <LedgerRow label="Decision authority">
              Human approval required
            </LedgerRow>
          </div>
        </article>
      </section>

      {/* OPERATIONAL INTELLIGENCE MONITOR */}

      <section
        className="incident-open-questions incident-monitor"
        aria-labelledby="incident-monitor-title"
      >
        <div className="incident-monitor-heading">
          <div>
            <span className="incident-monitor-eyebrow">
              OPERATIONAL INTELLIGENCE
            </span>

            <h2 id="incident-monitor-title">
              Evidence & impact monitor
            </h2>

            <p>
              Shipment condition, route conditions and delivery impact
              remain unverified until the required evidence is connected
              and the relevant assessments are performed.
            </p>
          </div>

          <div className="incident-monitor-connection">
            <span
              className="incident-monitor-connection-led"
              aria-hidden="true"
            />
            <div>
              <strong>AWAITING DATA</strong>
              <small>Live integration pending</small>
            </div>
          </div>
        </div>

        {/* AGENT RESPONSIBILITY PATHWAY */}

        <div className="incident-agent-pathway">
          <div className="incident-agent-pathway-heading">
            <span>AGENT RESPONSIBILITY MAP</span>
            <span>Assessment execution pending</span>
          </div>

          <div
            className="incident-agent-track"
            aria-hidden="true"
          >
            <span />
          </div>

          <div className="incident-agent-steps">
            <div className="incident-agent-step">
              <span className="incident-agent-node" aria-hidden="true" />
              <strong>Sensing</strong>
              <small>Event verification</small>
            </div>

            <div className="incident-agent-step">
              <span className="incident-agent-node" aria-hidden="true" />
              <strong>Logistics</strong>
              <small>Route and movement</small>
            </div>

            <div className="incident-agent-step">
              <span className="incident-agent-node" aria-hidden="true" />
              <strong>Scenario & Impact</strong>
              <small>Downstream exposure</small>
            </div>

            <div className="incident-agent-step">
              <span className="incident-agent-node" aria-hidden="true" />
              <strong>Compliance</strong>
              <small>Handling requirements</small>
            </div>
          </div>
        </div>

        {/* EVIDENCE PANELS */}

        <div className="incident-monitor-grid">

          {/* SHIPMENT INTEGRITY */}

          <article
            className="incident-monitor-panel"
            data-tone="teal"
          >
            <div className="incident-monitor-panel-heading">
              <div>
                <span className="incident-monitor-index">
                  CARGO
                </span>
                <h3>Shipment integrity</h3>
              </div>

              <span className="incident-monitor-panel-led"><span aria-hidden="true" />IMPACT CONFIRMED</span>
            </div>

            <div className="incident-monitor-ledger">
              <LedgerRow label="Disruption impact"><IncidentState state="active-reported">Confirmed in Control Tower</IncidentState></LedgerRow>

              <LedgerRow label="Shipment origin">
                <UnknownValue />
              </LedgerRow>

              <LedgerRow label="Cargo specifications">
                <UnknownValue />
              </LedgerRow>

              <LedgerRow label="Current cargo temperature">
                <IncidentState state="not-connected">
                  Sensor feed not connected
                </IncidentState>
              </LedgerRow>
            </div>

            <div className="incident-monitor-panel-note"><span aria-hidden="true" />The disruption impact is confirmed in Control Tower. Cargo condition still requires shipment evidence.</div>
          </article>

          {/* ROUTE INTELLIGENCE */}

          <article
            className="incident-monitor-panel"
            data-tone="amber"
          >
            <div className="incident-monitor-panel-heading">
              <div>
                <span className="incident-monitor-index">
                  NETWORK
                </span>
                <h3>Route intelligence</h3>
              </div>

              <span className="incident-monitor-panel-led">
                <span aria-hidden="true" />
                INCOMPLETE
              </span>
            </div>

            <div className="incident-monitor-ledger">
              <LedgerRow label="Exact closure location">
                <UnknownValue />
              </LedgerRow>

              <LedgerRow label="Live traffic information">
                <IncidentState state="not-connected">
                  Feed not connected
                </IncidentState>
              </LedgerRow>

              <LedgerRow label="Alternative route feasibility">
                <span className="incident-monitor-not-assessed">
                  Not assessed
                </span>
              </LedgerRow>
            </div>

            <div className="incident-monitor-panel-note">
              <span aria-hidden="true" />
              Route feasibility requires verified disruption
              and transportation information.
            </div>
          </article>

          {/* DELIVERY IMPACT */}

          <article
            className="incident-monitor-panel"
            data-tone="impact"
          >
            <div className="incident-monitor-panel-heading">
              <div>
                <span className="incident-monitor-index">
                  DELIVERY
                </span>
                <h3>Delivery impact</h3>
              </div>

              <span className="incident-monitor-panel-led">
                <span aria-hidden="true" />
                NOT CALCULATED
              </span>
            </div>

            <div className="incident-monitor-ledger">
              <LedgerRow label="Revised estimated arrival">
                <span className="incident-monitor-not-assessed">
                  Not calculated
                </span>
              </LedgerRow>

              <LedgerRow label="Calculated delivery delay">
                <span className="incident-monitor-not-assessed">
                  Not calculated
                </span>
              </LedgerRow>
            </div>

            <div className="incident-monitor-panel-note">
              <span aria-hidden="true" />
              Delivery impact depends on validated route
              information and recovery assessment.
            </div>
          </article>
        </div>

        {/* TRANSPARENCY */}

        <div className="incident-monitor-footer"><strong>HUMAN APPROVAL REQUIRED</strong>
        </div>
      </section>
      {/* NEXT WORKFLOW ACTION */}

      <section className="incident-next-step">
        <div>


          <h2>Recovery plan evaluation</h2>

          <p>
            Compare candidate recovery strategies against delivery
            timing, inventory impact and configured requirements.
            Final decisions remain subject to human approval.
          </p>
        </div>

        <button
          type="button"
          className="incident-primary-button"
          onClick={onContinue}
        >
          Continue to Recovery Comparison
          <span aria-hidden="true">&#8594;</span>
        </button>
      </section>

      <footer className="incident-page-footer">
        <span>FORESIGHTX INTELLIGENCE SYSTEMS</span>
        <span>SIMULATED DATA · HUMAN APPROVAL REQUIRED</span>
      </footer>
    </main>
  )
}

export default DisruptionDetails
