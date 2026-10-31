import { useState } from 'react'
import { createRoot } from 'react-dom/client'

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Database,
  Package,
  ShieldAlert,
  Truck,
} from 'lucide-react'

import Button from './components/button'
import DataTable, {
  type DataTableColumn,
} from './components/data-table'
import FieldRow from './components/field-row'
import Metric from './components/metric'
import MissingValue from './components/missing-value'
import PageHeader from './components/page-header'
import Panel from './components/panel'
import Section from './components/section'
import StatusPill from './components/status-pill'

import './index.css'
import './styles/design-tokens.css'
import './styles/components.css'
import './design-system-preview.css'

interface PlanRow {
  id: string
  name: string
  travel: string
  delay: string
  cost: string
}

const planRows: PlanRow[] = [
  {
    id: 'PLAN-A',
    name: 'Reroute Original Vehicle',
    travel: '120 min',
    delay: '45 min',
    cost: '₹500',
  },
  {
    id: 'PLAN-B',
    name: 'Deploy Alternate Vehicle',
    travel: '100 min',
    delay: '10 min',
    cost: '₹1,200',
  },
  {
    id: 'PLAN-C',
    name: 'Use Nearby Inventory',
    travel: '60 min',
    delay: '0 min',
    cost: '₹2,000',
  },
]

const planColumns: DataTableColumn<PlanRow>[] = [
  {
    id: 'plan',
    header: 'Recovery plan',
    render: (row) => (
      <strong className="fx-preview__table-primary">
        {row.name}
      </strong>
    ),
  },
  {
    id: 'travel',
    header: 'Travel input',
    align: 'right',
    render: (row) => row.travel,
  },
  {
    id: 'delay',
    header: 'Disruption delay input',
    align: 'right',
    render: (row) => row.delay,
  },
  {
    id: 'cost',
    header: 'Additional cost input',
    align: 'right',
    render: (row) => row.cost,
  },
]

export default function DesignSystemPreview() {
  const [lastAction, setLastAction] = useState(
    'No preview interaction yet.'
  )

  return (
    <main className="fx-preview">
      <div className="fx-preview__inner">

        {/* PREVIEW HEADER */}

        <header className="fx-preview__topbar">
          <div className="fx-preview__brand">
            <div className="fx-preview__brand-mark">
              F
            </div>

            <div>
              <strong>FORESIGHTX</strong>
              <span>INTELLIGENCE SYSTEMS</span>
            </div>
          </div>

          <div className="fx-preview__environment">
            DESIGN SYSTEM / PHASE 01
          </div>
        </header>

        {/* PAGE INTRODUCTION */}

        <PageHeader
          className="fx-preview__page-heading"
          eyebrow="COMPONENT LIBRARY / INTERNAL PREVIEW"
          title="Design system foundations"
          description="Shared visual components and interaction patterns for the FORESIGHTX operational workspace."
          actions={
            <StatusPill
              label="Preview environment"
              tone="neutral"
            />
          }
        />

        {/* SCENARIO CONTEXT */}

        <div className="fx-preview__notice">
          <Database size={16} />

          <span>
            Demonstration content based on the synthetic
            Hospital A scenario. Values below are supplied
            scenario inputs, not backend evaluation results.
          </span>
        </div>

        {/* METRICS */}

        <Section
          eyebrow="01 / METRIC SYSTEM"
          title="Operational metrics"
          description="Consistent numeric hierarchy, units and supporting context."
        >
          <div className="fx-preview__metric-grid">
            <Panel className="fx-preview__metric-panel">
              <Metric
                label="Shipment reference"
                value="TRK-104"
                compact
                context="Synthetic demonstration scenario"
              />
            </Panel>

            <Panel className="fx-preview__metric-panel">
              <Metric
                label="Shipment quantity"
                value="200"
                unit="units"
                context="Supplied scenario input"
              />
            </Panel>

            <Panel className="fx-preview__metric-panel">
              <Metric
                label="Delivery deadline"
                value="02:00"
                unit="PM"
                context="Supplied scenario input"
              />
            </Panel>

            <Panel className="fx-preview__metric-panel">
              <Metric
                label="Temperature range"
                value="2–8"
                unit="°C"
                context="Required operating range"
              />
            </Panel>
          </div>
        </Section>

        {/* BUTTONS AND STATES */}

        <Section
          eyebrow="02 / INTERACTION"
          title="Button system"
          description="Shared button variants, sizes and interaction feedback."
        >
          <Panel className="fx-preview__control-panel">
            <div className="fx-preview__button-group">
              <Button
                variant="primary"
                size="lg"
                trailingIcon={<ArrowRight size={16} />}
                onClick={() =>
                  setLastAction('Primary button interaction confirmed.')
                }
              >
                Primary action
              </Button>

              <Button
                variant="secondary"
                onClick={() =>
                  setLastAction('Secondary button interaction confirmed.')
                }
              >
                Secondary action
              </Button>

              <Button
                variant="tertiary"
                onClick={() =>
                  setLastAction('Tertiary button interaction confirmed.')
                }
              >
                Tertiary action
              </Button>

              <Button
                variant="secondary"
                disabled
              >
                Disabled state
              </Button>
            </div>

            <div className="fx-preview__interaction-result">
              <span>INTERACTION TEST</span>
              <strong>{lastAction}</strong>
            </div>
          </Panel>
        </Section>

        {/* STATUS SYSTEM */}

        <Section
          eyebrow="03 / SEMANTIC STATES"
          title="Status indicators"
          description="Every state has a clear label. Colour is never the only signal."
        >
          <Panel className="fx-preview__status-panel">
            <div className="fx-preview__status-list">
              <div>
                <CheckCircle2 size={16} />
                <span>Verified information</span>
                <StatusPill
                  label="Verified"
                  tone="positive"
                />
              </div>

              <div>
                <Clock3 size={16} />
                <span>Awaiting evaluation</span>
                <StatusPill
                  label="Pending"
                  tone="neutral"
                />
              </div>

              <div>
                <ShieldAlert size={16} aria-hidden="true" />
                <span>Operational warning</span>
                <StatusPill
                  label="At risk"
                  tone="warning"
                />
              </div>

              <div>
                <ShieldAlert size={16} />
                <span>Critical condition</span>
                <StatusPill
                  label="Critical"
                  tone="critical"
                />
              </div>

              <div>
                <Database size={16} />
                <span>Unestablished information</span>
                <StatusPill
                  label="Not assessed"
                  tone="unknown"
                />
              </div>
            </div>
          </Panel>
        </Section>

        {/* PANEL AND FIELD ROW */}

        <Section
          eyebrow="04 / INFORMATION SURFACES"
          title="Panels and field rows"
          description="A consistent way to organise shipment facts and operational context."
        >
          <div className="fx-preview__two-column">
            <Panel
              header={
                <div className="fx-preview__panel-heading">
                  <div>
                    <span>SHIPMENT PROFILE</span>
                    <h3>TRK-104</h3>
                  </div>

                  <Package size={18} />
                </div>
              }
              footer={
                <span className="fx-preview__panel-footnote">
                  Synthetic demonstration scenario
                </span>
              }
            >
              <FieldRow
                label="Product"
                value="Temperature-Sensitive IV Medicine"
              />

              <FieldRow
                label="Destination"
                value="Hospital A, Bengaluru"
              />

              <FieldRow
                label="Quantity"
                value="200 units"
              />

              <FieldRow
                label="Temperature"
                value="2–8°C"
              />
            </Panel>

            <Panel
              header={
                <div className="fx-preview__panel-heading">
                  <div>
                    <span>INFORMATION QUALITY</span>
                    <h3>Unknown data state</h3>
                  </div>

                  <Database size={18} />
                </div>
              }
            >
              <div className="fx-preview__missing-content">
                <FieldRow
                  label="Shipment reference"
                  value="TRK-104"
                />

                <FieldRow
                  label="Risk assessment"
                  value={
                    <MissingValue label="Risk not assessed" />
                  }
                />

                <FieldRow
                  label="Compliance result"
                  value={
                    <MissingValue
                      label="Not evaluated"
                      detail="No cold-chain validation result is available."
                    />
                  }
                />

                <FieldRow
                  label="Data freshness"
                  value={
                    <MissingValue label="Not established" />
                  }
                />
              </div>
            </Panel>
          </div>
        </Section>

        {/* DATA TABLE */}

        <Section
          eyebrow="05 / TABULAR DATA"
          title="Comparison table"
          description="Consistent numeric alignment and readable column hierarchy."
        >
          <Panel
            className="fx-preview__table-panel"
            header={
              <div className="fx-preview__panel-heading">
                <div>
                  <span>RECOVERY STRATEGIES</span>
                  <h3>Supplied scenario inputs</h3>
                </div>

                <Truck size={18} />
              </div>
            }
          >
            <DataTable
              caption="Synthetic Hospital A recovery plan inputs"
              columns={planColumns}
              rows={planRows}
              getRowKey={(row) => row.id}
            />

            <p className="fx-preview__table-note">
              All values shown are simulated inputs.
              No plan ranking or feasibility calculation is represented.
            </p>
          </Panel>
        </Section>

        {/* COMPLETION */}

        <footer className="fx-preview__footer">
          <span>FORESIGHTX DESIGN SYSTEM</span>
          <span>PHASE 01 · INTERNAL PREVIEW</span>
        </footer>
      </div>
    </main>
  )
}
createRoot(
  document.getElementById('root')!
).render(
  <DesignSystemPreview />
)