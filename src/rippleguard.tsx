import {
  Activity,
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
      'Identify connected shipments, routes and delivery commitments that a recovery plan may affect.',
    detail: 'Downstream dependency findings',
    icon: GitBranch,
  },
  {
    id: 'inventory',
    title: 'Inventory continuity',
    description:
      'Review warehouse availability, reserve thresholds and stock allocated to other requirements.',
    detail: 'Inventory exposure findings',
    icon: Warehouse,
  },
  {
    id: 'cold-chain',
    title: 'Cold-chain continuity',
    description:
      'Review refrigerated handling continuity and available temperature-exposure evidence.',
    detail: 'Temperature compliance findings',
    icon: Thermometer,
  },
  {
    id: 'delivery',
    title: 'Delivery commitments',
    description:
      'Identify potential effects on delivery windows and service-level commitments.',
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
    label: 'Downstream findings and affected entities',
    value: 'Not retrieved',
  },
  {
    label: 'Risk severity',
    value: 'Unknown',
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
            RISK INTELLIGENCE
          </span>

          <h2>RippleGuard</h2>
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
            No downstream assessment has been performed for this scenario.
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
              <article className="ripple-area-card" key={area.id}>
                <div className="ripple-area-top">
                  <div className="ripple-area-icon">
                    <Icon size={19} />
                  </div>
                </div>

                <h4>{area.title}</h4>
                <p>{area.description}</p>
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
  <span className="ripple-findings-label">
    ASSESSMENT UNAVAILABLE
  </span>

  <h4>Downstream impact remains unknown</h4>

  <p>
    No assessment has been performed for this scenario.
    This does not establish that secondary risks are absent.
  </p>

  <strong>Risk status: Unknown</strong>
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

          <p>This page shows supplied demonstration inputs only. No downstream assessment or live operational evidence has been retrieved. Unknown does not mean that risk is absent.</p>
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
          PROTOTYPE Ãƒâ€šÃ‚Â· SIMULATED DATA Ãƒâ€šÃ‚Â· HUMAN APPROVAL REQUIRED
        </span>
      </footer>
    </div>
  )
}

export default RippleGuard