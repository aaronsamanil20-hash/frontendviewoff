import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Clock3,
  Database,
  IndianRupee,
  Info,
  Package,
  Route,
  ShieldAlert,
  Truck,
  Warehouse,
} from 'lucide-react'

import './recoverycomparison.css'

interface RecoveryComparisonProps {
  shipment: string
  disruption: string
  destination: string
  quantity: string
  temperature: string
  deadline: string
  onBack: () => void
  onContinue: () => void
}

const recoveryPlans = [
  {
    id: 'PLAN-A',
    label: 'PLAN A',
    name: 'Reroute Original Vehicle',
    strategy: 'reroute_original_vehicle',
    description:
      'Continue the delivery using the original vehicle through an alternative route.',
    travelMinutes: 120,
    disruptionDelay: 45,
    additionalCost: 500,
    icon: Route,
    details: [
      { label: 'Strategy', value: 'Original vehicle rerouting' },
      { label: 'Vehicle availability', value: 'Existing vehicle' },
    ],
  },
  {
    id: 'PLAN-B',
    label: 'PLAN B',
    name: 'Deploy Alternate Vehicle',
    strategy: 'alternate_vehicle',
    description:
      'Deploy a separate eligible vehicle to continue the pharmaceutical delivery.',
    travelMinutes: 100,
    disruptionDelay: 10,
    additionalCost: 1200,
    icon: Truck,
    details: [
      { label: 'Alternate vehicle', value: 'ALT-101' },
      { label: 'Availability', value: 'Available · Scenario input' },
      { label: 'Eligibility', value: 'Eligible · Scenario input' },
      { label: 'Vehicle capacity', value: '250 units' },
    ],
  },
  {
    id: 'PLAN-C',
    label: 'PLAN C',
    name: 'Use Nearby Inventory',
    strategy: 'use_nearby_inventory',
    description:
      'Consider fulfilling the requirement using stock from a nearby regional warehouse.',
    travelMinutes: 60,
    disruptionDelay: 0,
    additionalCost: 2000,
    icon: Warehouse,
    details: [
      {
        label: 'Inventory location',
        value: 'Bengaluru Regional Warehouse',
      },
      {
        label: 'Available stock',
        value: '300 units · Scenario input',
      },
      {
        label: 'Minimum reserve',
        value: '50 units · Scenario input',
      },
    ],
  },
] as const

const pendingMetrics = [
  {
    label: 'Backend feasibility',
    value: 'Pending evaluation',
  },
  {
    label: 'Arrival outcome',
    value: 'Not calculated',
  },
  {
    label: 'Risk assessment',
    value: 'Not assessed',
  },
  {
    label: 'Cold-chain compliance',
    value: 'Not evaluated',
  },
  {
    label: 'Downstream impact',
    value: 'Not evaluated',
  },
]

function formatCurrency(value: number) {
  return `₹${value.toLocaleString('en-IN')}`
}

function RecoveryComparison({
  shipment,
  disruption,
  destination,
  quantity,
  temperature,
  deadline,
  onBack,
  onContinue,
}: RecoveryComparisonProps) {
  return (
    <div className="recovery-page">

      {/* PAGE INTRODUCTION */}

      <section className="recovery-intro">
        <div>
          <span className="recovery-eyebrow">
            RECOVERY WORKFLOW / STAGE 03
          </span>

          <h2>Recovery plan comparison</h2>

          <p>
            Examine the three proposed recovery strategies
            and their supplied operational inputs.
          </p>
        </div>

        <span className="recovery-demo-badge">
          SIMULATED SCENARIO
        </span>
      </section>

      {/* EVALUATION STATUS */}

      <section className="recovery-status-banner">
        <div className="recovery-status-icon">
          <Activity size={20} />
        </div>

        <div className="recovery-status-copy">
          <span>SIMULATION STATUS</span>

          <strong>Evaluation not yet performed</strong>

          <p>
            The values below are scenario inputs. No recovery
            plan has been evaluated or recommended.
          </p>
        </div>

        <span className="recovery-status-tag">
          NOT EVALUATED
        </span>
      </section>

      {/* SHIPMENT CONTEXT */}

      <section className="recovery-context">
        <div className="recovery-section-heading">
          <div>
            <span className="recovery-kicker">
              ACTIVE SCENARIO
            </span>

            <h3>Shipment overview</h3>
          </div>

          <Package size={19} />
        </div>

        <div className="recovery-context-grid">
          <div className="recovery-context-item">
            <span>SHIPMENT REFERENCE</span>
            <strong>{shipment}</strong>
          </div>

          <div className="recovery-context-item">
            <span>DESTINATION</span>
            <strong>{destination}</strong>
          </div>

          <div className="recovery-context-item">
            <span>QUANTITY</span>
            <strong>{quantity}</strong>
          </div>

          <div className="recovery-context-item">
            <span>DELIVERY DEADLINE</span>
            <strong>{deadline}</strong>
          </div>

          <div className="recovery-context-item">
            <span>TEMPERATURE REQUIREMENT</span>
            <strong>{temperature}</strong>
          </div>

          <div className="recovery-context-item">
            <span>ACTIVE DISRUPTION</span>
            <strong>{disruption}</strong>
          </div>
        </div>
      </section>

      {/* RECOVERY PLAN CARDS */}

      <section className="recovery-plans-section">
        <div className="recovery-section-heading">
          <div>
            <span className="recovery-kicker">
              AVAILABLE STRATEGIES
            </span>

            <h3>Compare recovery plans</h3>

            <p>
              Three proposed alternatives supplied for this scenario.
            </p>
          </div>

          <span className="recovery-plan-count">
            03 PLANS
          </span>
        </div>

        <div className="recovery-plan-grid">
          {recoveryPlans.map((plan) => {
            const Icon = plan.icon

            return (
              <article
                className="recovery-plan-card"
                key={plan.id}
              >
                <div className="recovery-plan-top">
                  <span className="recovery-plan-label">
                    {plan.label}
                  </span>

                  <div className="recovery-plan-icon">
                    <Icon size={19} />
                  </div>
                </div>

                <h4>{plan.name}</h4>

                <p className="recovery-plan-description">
                  {plan.description}
                </p>

                <div className="recovery-plan-strategy">
                  <span>STRATEGY</span>
                  <code>{plan.strategy}</code>
                </div>

                <div className="recovery-input-heading">
                  SUPPLIED INPUTS
                </div>

                <div className="recovery-input-metrics">
                  <div>
                    <Clock3 size={15} />
                    <span>Estimated travel</span>
                    <strong>{plan.travelMinutes} min</strong>
                  </div>

                  <div>
                    <AlertTriangle size={15} />
                    <span>Disruption delay input</span>
                    <strong>{plan.disruptionDelay} min</strong>
                  </div>

                  <div>
                    <IndianRupee size={15} />
                    <span>Additional cost</span>
                    <strong>
                      {formatCurrency(plan.additionalCost)}
                    </strong>
                  </div>
                </div>

                <div className="recovery-plan-details">
                  <span className="recovery-details-heading">
                    OPERATIONAL DETAILS
                  </span>

                  {plan.details.map((detail) => (
                    <div
                      className="recovery-detail-row"
                      key={detail.label}
                    >
                      <span>{detail.label}</span>
                      <strong>{detail.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="recovery-plan-footer">
                  <span className="recovery-pending-dot" />
                  Evaluation pending
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* EVALUATION OUTPUT */}

      <section className="recovery-results-section">
        <div className="recovery-section-heading">
          <div>
            <span className="recovery-kicker">
              EVALUATION OUTPUT
            </span>

            <h3>Decision-engine assessment</h3>

            <p>
              These results require an actual backend evaluation.
            </p>
          </div>

          <Database size={19} />
        </div>

        <div className="recovery-results-table-wrapper">
          <table className="recovery-results-table">
            <thead>
              <tr>
                <th>ASSESSMENT</th>
                <th>PLAN A</th>
                <th>PLAN B</th>
                <th>PLAN C</th>
              </tr>
            </thead>

            <tbody>
              {pendingMetrics.map((metric) => (
                <tr key={metric.label}>
                  <td>{metric.label}</td>

                  <td>
                    <span className="recovery-unavailable">
                      {metric.value}
                    </span>
                  </td>

                  <td>
                    <span className="recovery-unavailable">
                      {metric.value}
                    </span>
                  </td>

                  <td>
                    <span className="recovery-unavailable">
                      {metric.value}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DECISION STATUS */}

      <section className="recovery-decision-panel">
        <div className="recovery-decision-icon">
          <ShieldAlert size={21} />
        </div>

        <div className="recovery-decision-copy">
          <span>DECISION STATUS</span>

          <h3>No recommendation available yet</h3>

          <p>
            No plan has been ranked or selected. The decision
            engine must evaluate the supplied inputs first.
            Human approval remains mandatory before a final decision.
          </p>
        </div>

        <span className="recovery-decision-tag">
          AWAITING EVALUATION
        </span>
      </section>

      {/* DATA LIMITATIONS */}

      <section className="recovery-information-panel">
        <div className="recovery-information-heading">
          <Info size={17} />
          <strong>Data interpretation and limitations</strong>
        </div>

        <div className="recovery-information-grid">
          <p>
            <strong>Travel duration:</strong> Supplied travel
            estimates are scenario inputs, not calculated arrival times.
          </p>

          <p>
            <strong>Cost:</strong> Values are displayed in INR
            under the agreed scenario convention.
          </p>

          <p>
            <strong>Risk:</strong> No risk level has been assessed yet.
          </p>

          <p>
            <strong>Cold chain:</strong> The 2–8°C requirement is
            known, but compliance has not been evaluated.
          </p>

          <p>
            <strong>Downstream effects:</strong> No ripple-effect
            simulation has been performed.
          </p>

          <p>
            <strong>Data source:</strong> All displayed plan
            information is simulated scenario input.
          </p>
        </div>
      </section>

      {/* WORKFLOW NAVIGATION */}

      <section className="recovery-navigation">
        <button
          type="button"
          className="recovery-back-button"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          Back to Disruption Details
        </button>

        <button
          type="button"
          className="recovery-continue-button"
          onClick={onContinue}
        >
          Continue to RippleGuard
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

export default RecoveryComparison