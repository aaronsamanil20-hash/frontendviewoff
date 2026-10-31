import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Database,
  GitBranch,
  Info,
  Package,
  ShieldAlert,
  Thermometer,
  Truck,
  Warehouse,
} from 'lucide-react'

import './rippleguard.css'

interface RippleGuardProps {
  shipment: string
  disruption: string
  destination: string
  quantity: string
  temperature: string
  deadline: string
  onBack: () => void
  onContinue: () => void
}

const assessmentAreas = [
  {
    id: 'network',
    title: 'Network dependencies',
    description:
      'Assess other shipments, connected routes and delivery commitments that could be affected by a recovery plan.',
    detail: 'Downstream dependency findings',
    icon: GitBranch,
  },
  {
    id: 'inventory',
    title: 'Inventory continuity',
    description:
      'Assess warehouse stock, reserve thresholds and possible effects on inventory allocated to other requirements.',
    detail: 'Inventory exposure findings',
    icon: Warehouse,
  },
  {
    id: 'cold-chain',
    title: 'Cold-chain continuity',
    description:
      'Assess temperature-controlled handling continuity and any available evidence of temperature exposure.',
    detail: 'Temperature compliance findings',
    icon: Thermometer,
  },
  {
    id: 'delivery',
    title: 'Delivery commitments',
    description:
      'Assess potential effects on delivery windows and other service-level commitments.',
    detail: 'Delivery impact findings',
    icon: Truck,
  },
] as const

const dataLimitations = [
  {
    label: 'Scenario information',
    value: 'Supplied demonstration inputs',
  },
  {
    label: 'Downstream dependencies',
    value: 'Not returned',
  },
  {
    label: 'Risk severity',
    value: 'Unknown',
  },
  {
    label: 'Affected entities',
    value: 'Not identified',
  },
  {
    label: 'Impact calculation',
    value: 'Not performed',
  },
  {
    label: 'Live operational feeds',
    value: 'Not represented',
  },
]

function RippleGuard({
  shipment,
  disruption,
  destination,
  quantity,
  temperature,
  deadline,
  onBack,
  onContinue,
}: RippleGuardProps) {
  return (
    <div className="ripple-page">
      {/* PAGE INTRODUCTION */}

      <section className="ripple-intro">
        <div>
          <span className="ripple-eyebrow">
            RISK INTELLIGENCE / STAGE 04
          </span>

          <h2>Downstream impact assessment</h2>

          <p>
            Examine potential secondary effects and dependencies
            associated with the pharmaceutical recovery scenario.
          </p>
        </div>

        <span className="ripple-demo-badge">
          SIMULATED SCENARIO
        </span>
      </section>

      {/* ASSESSMENT STATUS */}

      <section
        className="ripple-status-banner"
        aria-labelledby="ripple-status-title"
      >
        <div className="ripple-status-icon">
          <Activity size={20} />
        </div>

        <div className="ripple-status-copy">
          <span>RIPPLEGUARD STATUS</span>

          <strong id="ripple-status-title">
            Impact assessment not performed
          </strong>

          <p>
            No downstream assessment results are currently available.
            A missing assessment does not mean that no secondary risk exists.
          </p>
        </div>

        <span className="ripple-status-tag">
          NOT ASSESSED
        </span>
      </section>

      {/* SCENARIO CONTEXT */}

      <section className="ripple-context">
        <div className="ripple-section-heading">
          <div>
            <span className="ripple-kicker">
              ACTIVE SCENARIO
            </span>

            <h3>Shipment context</h3>
          </div>

          <Package size={19} />
        </div>

        <div className="ripple-context-grid">
          <div className="ripple-context-item">
            <span>SHIPMENT REFERENCE</span>
            <strong>{shipment}</strong>
          </div>

          <div className="ripple-context-item">
            <span>DESTINATION</span>
            <strong>{destination}</strong>
          </div>

          <div className="ripple-context-item">
            <span>QUANTITY</span>
            <strong>{quantity}</strong>
          </div>

          <div className="ripple-context-item">
            <span>DELIVERY DEADLINE</span>
            <strong>{deadline}</strong>
          </div>

          <div className="ripple-context-item">
            <span>TEMPERATURE REQUIREMENT</span>
            <strong>{temperature}</strong>
          </div>

          <div className="ripple-context-item">
            <span>ACTIVE DISRUPTION</span>
            <strong>{disruption}</strong>
          </div>
        </div>
      </section>

      {/* ASSESSMENT SCOPE */}

      <section className="ripple-scope-section">
        <div className="ripple-section-heading">
          <div>
            <span className="ripple-kicker">
              SECONDARY IMPACT ANALYSIS
            </span>

            <h3>Assessment scope</h3>

            <p>
              Areas that require evaluation before downstream
              impact can be established.
            </p>
          </div>

          <GitBranch size={19} />
        </div>

        <div className="ripple-area-grid">
          {assessmentAreas.map((area) => {
            const Icon = area.icon

            return (
              <article
                className="ripple-area-card"
                key={area.id}
              >
                <div className="ripple-area-top">
                  <div className="ripple-area-icon">
                    <Icon size={19} />
                  </div>

                  <span className="ripple-area-state">
                    NOT ASSESSED
                  </span>
                </div>

                <h4>{area.title}</h4>

                <p>{area.description}</p>

                <div className="ripple-area-footer">
                  <span>{area.detail}</span>
                  <strong>Unavailable</strong>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* RISK FINDINGS */}

      <section className="ripple-findings-section">
        <div className="ripple-section-heading">
          <div>
            <span className="ripple-kicker">
              ASSESSMENT OUTPUT
            </span>

            <h3>Downstream risk findings</h3>

            <p>
              Findings, affected entities and supporting evidence
              will appear here after evaluation.
            </p>
          </div>

          <ShieldAlert size={19} />
        </div>

        <div
          className="ripple-findings-empty"
          role="status"
          aria-live="polite"
        >
          <div className="ripple-findings-icon">
            <AlertTriangle size={22} />
          </div>

          <span className="ripple-findings-label">
            NO EVALUATED FINDINGS
          </span>

          <h4>No downstream findings available</h4>

          <p>
            RippleGuard has not returned an assessment for this scenario.
            Affected shipments, severity levels, risk scores and
            explanations cannot be displayed yet.
          </p>

          <strong>
            Current risk status: Unknown
          </strong>
        </div>
      </section>

      {/* DATA LIMITATIONS */}

      <section className="ripple-limitations">
        <div className="ripple-section-heading">
          <div>
            <span className="ripple-kicker">
              TRANSPARENCY & EVIDENCE
            </span>

            <h3>Assessment data and limitations</h3>
          </div>

          <Database size={19} />
        </div>

        <div className="ripple-limitations-table">
          {dataLimitations.map((item) => (
            <div
              className="ripple-limitation-row"
              key={item.label}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

        <div className="ripple-information-note">
          <Info size={17} />

          <p>
            The current page displays scenario context and assessment
            requirements only. It does not confirm the absence of
            secondary effects or represent a completed AI analysis.
            Any future findings must be supported by actual backend
            evaluation results.
          </p>
        </div>
      </section>

      {/* WORKFLOW NAVIGATION */}

      <section className="ripple-navigation">
        <button
          type="button"
          className="ripple-back-button"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          Back to Recovery Comparison
        </button>

        <button
          type="button"
          className="ripple-continue-button"
          onClick={onContinue}
        >
          Continue to Decision Passport
          <ArrowRight size={16} />
        </button>
      </section>

      <footer className="dashboard-footer">
        <span>FORESIGHTX INTELLIGENCE SYSTEMS</span>

        <span>
          PROTOTYPE · SIMULATED DATA · HUMAN APPROVAL REQUIRED
        </span>
      </footer>
    </div>
  )
}

export default RippleGuard