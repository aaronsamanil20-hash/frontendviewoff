import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  Database,
  FileText,
  Info,
  Package,
  ShieldCheck,
  UserRound,
  Workflow,
} from 'lucide-react'

import './decisionpassport.css'

interface DecisionPassportProps {
  shipment: string
  disruption: string
  destination: string
  quantity: string
  temperature: string
  deadline: string
  onBack: () => void
  onReturnToControlTower: () => void
}

const decisionSummary = [
  {
    label: 'Decision outcome',
    value: 'Not retrieved',
    description: 'Backend decision response',
  },
  {
    label: 'Selected recovery plan',
    value: 'Not displayed',
    description: 'No plan selection loaded',
  },
  {
    label: 'Decision record',
    value: 'Not retrieved',
    description: 'Backend record identifier',
  },
  {
    label: 'Human review',
    value: 'Not retrieved',
    description: 'Approval or rejection record',
  },
]

const agentRecords = [
  {
    name: 'Sensing Agent',
    responsibility: 'Disruption identification and scenario context',
  },
  {
    name: 'Logistics Agent',
    responsibility: 'Transport and logistics evaluation',
  },
  {
    name: 'Inventory Agent',
    responsibility: 'Inventory availability and constraints',
  },
  {
    name: 'Scenario Planning Agent',
    responsibility: 'Recovery-plan simulation',
  },
  {
    name: 'Compliance Agent',
    responsibility: 'Configured operational and compliance checks',
  },
]

const evidenceRecords = [
  {
    label: 'Scenario information',
    source: 'Frontend demonstration scenario',
    status: 'Available in frontend',
    available: true,
  },
  {
    label: 'Recovery plan inputs',
    source: 'Recovery Comparison',
    status: 'Scenario inputs only',
    available: true,
  },
  {
    label: 'Simulation results',
    source: 'Backend simulation response',
    status: 'Not retrieved',
    available: false,
  },
  {
    label: 'Agent findings and evidence',
    source: 'Agent audit records',
    status: 'Not retrieved',
    available: false,
  },
  {
    label: 'Downstream risk findings',
    source: 'RippleGuard assessment',
    status: 'Not retrieved',
    available: false,
  },
  {
    label: 'Persistence confirmation',
    source: 'SAP HANA records',
    status: 'Not queried by frontend',
    available: false,
  },
]

const reviewRecords = [
  {
    label: 'Reviewer identity',
    value: 'Not retrieved',
  },
  {
    label: 'Review outcome',
    value: 'Not retrieved',
  },
  {
    label: 'Reviewer comments',
    value: 'Not retrieved',
  },
  {
    label: 'Uncertainty acknowledgement',
    value: 'Not retrieved',
  },
  {
    label: 'Review timestamp',
    value: 'Not retrieved',
  },
]

const recordDetails = [
  {
    label: 'Decision identifier',
    value: 'Not retrieved',
  },
  {
    label: 'Selected recovery strategy',
    value: 'Not displayed',
  },
  {
    label: 'Decision timestamp',
    value: 'Not retrieved',
  },
  {
    label: 'Persistence reference',
    value: 'Not retrieved',
  },
]

function DecisionPassport({
  shipment,
  disruption,
  destination,
  quantity,
  temperature,
  deadline,
  onBack,
  onReturnToControlTower,
}: DecisionPassportProps) {
  return (
    <div className="passport-page">

      {/* PAGE INTRODUCTION */}

      <section className="passport-intro">
        <div>

          <h2>Decision Passport</h2>

          <p>
            Review the evidence, agent activity, decision records
            and human oversight associated with the recovery scenario.
          </p>
        </div>

        <span className="passport-demo-badge">
          SIMULATED SCENARIO
        </span>
      </section>

      {/* RECORD STATUS */}

      <section className="passport-status-banner">
        <div className="passport-status-icon">
          <ClipboardCheck size={21} />
        </div>

        <div className="passport-status-copy">
          <span>DECISION RECORD STATUS</span>

          <strong>
            Backend decision record not loaded
          </strong>

          <p>
            This frontend has not yet retrieved a persisted
            simulation or decision record. No final decision
            or human approval is being represented.
          </p>
        </div>

        <span className="passport-status-tag">
          AWAITING DATA
        </span>
      </section>

      {/* SCENARIO CONTEXT */}

      <section className="passport-context">
        <div className="passport-section-heading">
          <div>
            <span className="passport-kicker">
              SCENARIO REFERENCE
            </span>

            <h3>Shipment context</h3>
          </div>

          <Package size={19} />
        </div>

        <div className="passport-context-grid">
          <div className="passport-context-item">
            <span>SHIPMENT REFERENCE</span>
            <strong>{shipment}</strong>
          </div>

          <div className="passport-context-item">
            <span>DESTINATION</span>
            <strong>{destination}</strong>
          </div>

          <div className="passport-context-item">
            <span>QUANTITY</span>
            <strong>{quantity}</strong>
          </div>

          <div className="passport-context-item">
            <span>DELIVERY DEADLINE</span>
            <strong>{deadline}</strong>
          </div>

          <div className="passport-context-item">
            <span>TEMPERATURE REQUIREMENT</span>
            <strong>{temperature}</strong>
          </div>

          <div className="passport-context-item">
            <span>ACTIVE DISRUPTION</span>
            <strong>{disruption}</strong>
          </div>
        </div>
      </section>

      {/* DECISION SUMMARY */}

      <section className="passport-summary-section">
        <div className="passport-section-heading">
          <div>
            <span className="passport-kicker">
              DECISION OVERVIEW
            </span>

            <h3>Decision summary</h3>

            <p>
              Values will be populated from the actual backend
              decision response.
            </p>
          </div>

          <Activity size={19} />
        </div>

        <div className="passport-summary-grid">
          {decisionSummary.map((item) => (
            <article
              className="passport-summary-card"
              key={item.label}
            >
              <span>{item.label}</span>

              <strong>{item.value}</strong>

              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* DECISION RECORD */}

      <section className="passport-record-section">
        <div className="passport-section-heading">
          <div>
            <span className="passport-kicker">
              RECORD DETAILS
            </span>

            <h3>Decision record</h3>
          </div>

          <FileText size={19} />
        </div>

        <div className="passport-record-list">
          {recordDetails.map((item) => (
            <div
              className="passport-record-row"
              key={item.label}
            >
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* AGENT AUDIT TRAIL */}

      <section className="passport-agents-section">
        <div className="passport-section-heading">
          <div>
            <span className="passport-kicker">
              AGENT ORCHESTRATION
            </span>

            <h3>Agent audit trail</h3>

            <p>
              The following agents form the agreed platform architecture.
              Their individual execution records have not yet been
              retrieved by this frontend.
            </p>
          </div>

          <Workflow size={19} />
        </div>

        <div className="passport-agent-list">
          {agentRecords.map((agent, index) => (
            <article
              className="passport-agent-row"
              key={agent.name}
            >
              <div className="passport-agent-index">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="passport-agent-info">
                <strong>{agent.name}</strong>
                <span>{agent.responsibility}</span>
              </div>

              <span className="passport-agent-status">
                Audit not retrieved
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* EVIDENCE AND PROVENANCE */}

      <section className="passport-evidence-section">
        <div className="passport-section-heading">
          <div>
            <span className="passport-kicker">
              EVIDENCE & PROVENANCE
            </span>

            <h3>Information supporting the decision</h3>

            <p>
              Distinguishes locally available scenario inputs
              from backend evidence not yet loaded.
            </p>
          </div>

          <Database size={19} />
        </div>

        <div className="passport-evidence-table-wrapper">
          <table className="passport-evidence-table">
            <thead>
              <tr>
                <th>INFORMATION</th>
                <th>SOURCE</th>
                <th>FRONTEND STATUS</th>
              </tr>
            </thead>

            <tbody>
              {evidenceRecords.map((record) => (
                <tr key={record.label}>
                  <td>{record.label}</td>

                  <td>{record.source}</td>

                  <td>
                    <span
                      className={
                        record.available
                          ? 'passport-evidence-status available'
                          : 'passport-evidence-status unavailable'
                      }
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* HUMAN REVIEW */}

      <section className="passport-review-section">
        <div className="passport-section-heading">
          <div>
            <span className="passport-kicker">
              HUMAN-IN-THE-LOOP
            </span>

            <h3>Human review record</h3>

            <p>
              Final recovery decisions require authorised human
              review. No review action has been submitted through
              this frontend.
            </p>
          </div>

          <ShieldCheck size={19} />
        </div>

        <div className="passport-review-banner">
          <div className="passport-review-icon">
            <UserRound size={20} />
          </div>

          <div>
            <strong>Human approval status not retrieved</strong>

            <p>
              Approval, rejection and reviewer information will
              be displayed here after connecting the review API.
            </p>
          </div>
        </div>

        <div className="passport-review-list">
          {reviewRecords.map((record) => (
            <div
              className="passport-review-row"
              key={record.label}
            >
              <span>{record.label}</span>
              <strong>{record.value}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* TRACEABILITY NOTE */}

      <section className="passport-integrity-note">
        <Info size={18} />

        <div>
          <strong>Evidence and decision integrity</strong>

          <p>
            The scenario information shown on this page comes
            from frontend demonstration data. The frontend has
            not queried backend simulation output, agent audit
            records, decision history or SAP HANA persistence
            for this session. Therefore, it cannot independently
            confirm whether a decision was generated, saved,
            approved or rejected.
          </p>
        </div>
      </section>

      {/* WORKFLOW NAVIGATION */}

      <section className="passport-navigation">
        <button
          type="button"
          className="passport-back-button"
          onClick={onBack}
        >
          <ArrowLeft size={16} />
          Back to RippleGuard
        </button>

        <button
          type="button"
          className="passport-return-button"
          onClick={onReturnToControlTower}
        >
          Return to Control Tower
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

export default DecisionPassport