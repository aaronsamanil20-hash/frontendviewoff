import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Clock3,
  Database,
  IndianRupee,
  Info,
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
      { label: 'Availability', value: 'Available Â· Scenario input' },
      { label: 'Eligibility', value: 'Eligible Â· Scenario input' },
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
        value: '300 units Â· Scenario input',
      },
      {
        label: 'Minimum reserve',
        value: '50 units Â· Scenario input',
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
  return `â‚¹${value.toLocaleString('en-IN')}`
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

      <section className="recovery-intro recovery-brief">
  <div className="recovery-brief-main">
    <div className="recovery-brief-topline">


      <div className="recovery-brief-source">

        <span>SIMULATED SCENARIO</span>
      </div>
    </div>

    <h2>Recovery plan evaluation</h2>

    <p>
      Compare three proposed recovery strategies against the active
      scenario, supplied operational inputs, delivery commitments
      and configured constraints.
    </p>


  </div>
</section>

      {/* EVALUATION STATUS */}

      <section className="recovery-status-banner recovery-command-panel">
  <div className="recovery-command-status">
    NOT EVALUATED
  </div>

  <h3>Recovery options standing by.</h3>

  <p>
    Three proposed strategies are staged against the active
    disruption. Comparative assessment has not started.
  </p>

  <div className="recovery-command-footer">
    <span>Awaiting evaluation</span>

  </div>
</section>

      {/* SHIPMENT CONTEXT */}

      <section
        className="recovery-context recovery-scenario-panel recovery-shipment-command"
        aria-label="Shipment overview"
      >
        <div className="recovery-shipment-identity">
          <span>SHIPMENT OVERVIEW</span>
          <h3>{shipment}</h3>
          <p>{destination}</p>
        </div>

        <div className="recovery-confirmed-disruption">
          <div className="recovery-disruption-status">
            <span
              className="recovery-disruption-led"
              aria-hidden="true"
            />
            <span>CONFIRMED DISRUPTION</span>
          </div>

          <strong>{disruption}</strong>
        </div>

        <div className="recovery-shipment-metrics">
          <div className="recovery-shipment-metric">
            <span>QUANTITY</span>
            <strong>{quantity}</strong>
          </div>

          <div className="recovery-shipment-metric">
            <span>DELIVERY DEADLINE</span>
            <strong>{deadline}</strong>
          </div>

          <div className="recovery-shipment-metric">
            <span>TEMPERATURE REQUIREMENT</span>
            <strong>{temperature}</strong>
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

                <div className="recovery-plan-footer recovery-plan-awaiting">
                  <span>Awaiting assessment</span>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* DECISION INTELLIGENCE */}

      <section className="recovery-results-section recovery-intelligence-panel">
        <div className="recovery-section-heading recovery-intelligence-heading">
          <div>
            <span className="recovery-kicker">
              DECISION INTELLIGENCE
            </span>

            <h3>Comparative assessment</h3>

            <p>
              Review the evaluation status of each recovery strategy
              across feasibility, delivery, risk and compliance.
            </p>
          </div>

          <Database size={19} />
        </div>

        <div className="recovery-results-table-wrapper recovery-intelligence-table">
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
                    <span className="recovery-result-state">
                      {metric.value}
                    </span>
                  </td>

                  <td>
                    <span className="recovery-result-state">
                      {metric.value}
                    </span>
                  </td>

                  <td>
                    <span className="recovery-result-state">
                      {metric.value}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FINAL DECISION STATUS */}

      <section className="recovery-decision-panel recovery-decision-summary">
        <div className="recovery-decision-icon">
          <ShieldAlert size={21} />
        </div>

        <div className="recovery-decision-copy">
          <span>DECISION STATUS</span>

          <h3>No recommendation generated</h3>

          <p>
            Comparative assessment has not been completed.
            No recovery strategy has been ranked or selected.
            A human reviewer must approve any final decision.
          </p>

          <div className="recovery-human-approval">
            Human approval required before final action.
          </div>
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
            <strong>Cold chain:</strong> The 2â€“8Â°C requirement is
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
          PROTOTYPE Â· SIMULATED DATA Â· HUMAN APPROVAL REQUIRED
        </span>
      </footer>
    </div>
  )
}

export default RecoveryComparison
