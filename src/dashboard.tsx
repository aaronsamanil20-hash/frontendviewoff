import { useState, type FormEvent, type ReactNode } from 'react'
import {
  ClipboardCheck,
  GitBranch,
  LayoutDashboard,
  LogOut,
  Radio,
  ShieldAlert,
  UserRound,
} from 'lucide-react'

import DisruptionDetails from './disruptiondetails'
import RecoveryComparison from './recoverycomparison'
import RippleGuard from './rippleguard'
import DecisionPassport from './decisionpassport'

import './dashboard.css'
import './styles/control-tower.css'
import './styles/profile.css'

type WorkflowPage =
  | 'Control Tower'
  | 'Disruption Details'
  | 'Recovery Comparison'
  | 'RippleGuard'
  | 'Decision Passport'

export type UserProfile = {
  fullName: string
  email: string
  phone: string
  team: string
  department: string
  timeZone: string
  notifyByEmail: boolean
}

type DashboardProps = {
  profile: UserProfile
  onProfileChange: (profile: UserProfile) => void
  onSignOut?: () => void
}

const scenario = {
  shipment: 'TRK-104',
  disruption: 'NH-44 road closure',
  destination: 'Hospital A, Bengaluru',
  quantity: '200 medicine units',
  temperature: '2–8°C',
  deadline: '2:00 PM',
  eventTime: '10:15 AM',
  dataSource: 'Simulated data',
}

const workflowSteps = [
  {
    number: '01',
    label: 'Control Tower' as const,
    description: 'Operational overview',
    icon: LayoutDashboard,
    state: 'Current',
  },
  {
    number: '02',
    label: 'Disruption Details' as const,
    description: 'Inspect the disruption',
    icon: Radio,
    state: 'Next',
  },
  {
    number: '03',
    label: 'Recovery Comparison' as const,
    description: 'Compare recovery options',
    icon: GitBranch,
    state: 'Not started',
  },
  {
    number: '04',
    label: 'RippleGuard' as const,
    description: 'Review downstream impact',
    icon: ShieldAlert,
    state: 'Not started',
  },
  {
    number: '05',
    label: 'Decision Passport' as const,
    description: 'Review the decision record',
    icon: ClipboardCheck,
    state: 'Not started',
  },
]

function StateMark({
  state,
  label,
}: {
  state:
    | 'ready'
    | 'next'
    | 'not-started'
    | 'at-risk'
    | 'not-connected'
  label: string
}) {
  return (
    <span className={`fx-state fx-state--${state}`}>
      <span className="fx-state-mark" aria-hidden="true" />
      <span>{label}</span>
    </span>
  )
}

function UnknownValue() {
  return <span className="fx-unknown">Unknown</span>
}

function LedgerRow({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="fx-ledger-row">
      <span className="fx-ledger-label">{label}</span>
      <div className="fx-ledger-value">{children}</div>
    </div>
  )
}

function ProfileField({
  id,
  label,
  value,
  editing,
  type = 'text',
  onChange,
}: {
  id: string
  label: string
  value: string
  editing: boolean
  type?: 'text' | 'email' | 'tel'
  onChange: (value: string) => void
}) {
  return (
    <div className="fx-profile-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="fx-profile-input"
        type={type}
        value={value}
        disabled={!editing}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
    </div>
  )
}

function ProfileScreen({
  profile,
  onSave,
}: {
  profile: UserProfile
  onSave: (profile: UserProfile) => void
}) {
  const [draft, setDraft] = useState<UserProfile>(profile)
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  function updateField<K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K],
  ) {
    setDraft((current) => ({
      ...current,
      [key]: value,
    }))
    setSaved(false)
  }

  function beginEditing() {
    setDraft(profile)
    setSaved(false)
    setEditing(true)
  }

  function cancelEditing() {
    setDraft(profile)
    setEditing(false)
    setSaved(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const updatedProfile: UserProfile = {
      ...draft,
      fullName: draft.fullName.trim(),
      email: draft.email.trim().toLowerCase(),
      phone: draft.phone.trim(),
      team: draft.team.trim(),
      department: draft.department.trim(),
    }

    if (!updatedProfile.fullName || !updatedProfile.email) {
      return
    }

    onSave(updatedProfile)
    setDraft(updatedProfile)
    setEditing(false)
    setSaved(true)
  }

  return (
    <section className="fx-profile-page">
      <header className="fx-profile-heading">
        <div>
          <h1>Profile</h1>
          <p className="fx-profile-finding">
            Account information and preferences for this demonstration
            workspace.
          </p>
        </div>

        <div className="fx-profile-account-state">
          <StateMark
            state="not-connected"
            label="Local demo profile"
          />
        </div>
      </header>

      {saved && (
        <p
          className="fx-profile-saved"
          role="status"
          aria-live="polite"
        >
          Profile changes saved in this browser.
        </p>
      )}

      <form
        className="fx-profile-form"
        onSubmit={handleSubmit}
      >
        <div className="fx-profile-grid">
          <section className="fx-profile-column">
            <div className="fx-profile-section-heading">
              <h2>Personal details</h2>
              <p>
                Information associated with your demonstration account.
              </p>
            </div>

            <div className="fx-profile-fields">
              <ProfileField
                id="profile-full-name"
                label="Full name"
                value={draft.fullName}
                editing={editing}
                onChange={(value) => updateField('fullName', value)}
              />

              <ProfileField
                id="profile-email"
                label="Email address"
                value={draft.email}
                editing={editing}
                type="email"
                onChange={(value) => updateField('email', value)}
              />

              <ProfileField
                id="profile-phone"
                label="Phone number"
                value={draft.phone}
                editing={editing}
                type="tel"
                onChange={(value) => updateField('phone', value)}
              />

              <ProfileField
                id="profile-team"
                label="Team"
                value={draft.team}
                editing={editing}
                onChange={(value) => updateField('team', value)}
              />

              <ProfileField
                id="profile-department"
                label="Department"
                value={draft.department}
                editing={editing}
                onChange={(value) => updateField('department', value)}
              />
            </div>
          </section>

          <section className="fx-profile-column">
            <div className="fx-profile-section-heading">
              <h2>Workspace and preferences</h2>
              <p>
                Access information and settings for this local profile.
              </p>
            </div>

            <div className="fx-profile-ledger">
              <LedgerRow label="Role">
                <span>Operations admin</span>
              </LedgerRow>

              <LedgerRow label="Workspace">
                <span>Demo workspace</span>
              </LedgerRow>

              <LedgerRow label="Account type">
                <span>Local demonstration account</span>
              </LedgerRow>

              <LedgerRow label="Authentication">
                <StateMark
                  state="not-connected"
                  label="Server authentication not connected"
                />
              </LedgerRow>

              <div className="fx-profile-preference">
                <div>
                  <label htmlFor="profile-time-zone">
                    Time zone
                  </label>
                  <p>
                    Used for displaying times in this workspace.
                  </p>
                </div>

                <select
                  id="profile-time-zone"
                  className="fx-profile-select"
                  value={draft.timeZone}
                  disabled={!editing}
                  onChange={(event) =>
                    updateField('timeZone', event.target.value)
                  }
                >
                  <option value="Asia/Kolkata">
                    Asia/Kolkata
                  </option>
                  <option value="Asia/Singapore">
                    Asia/Singapore
                  </option>
                  <option value="Europe/London">
                    Europe/London
                  </option>
                  <option value="Europe/Berlin">
                    Europe/Berlin
                  </option>
                  <option value="America/New_York">
                    America/New_York
                  </option>
                  <option value="America/Los_Angeles">
                    America/Los_Angeles
                  </option>
                  {![
                    'Asia/Kolkata',
                    'Asia/Singapore',
                    'Europe/London',
                    'Europe/Berlin',
                    'America/New_York',
                    'America/Los_Angeles',
                  ].includes(draft.timeZone) && (
                    <option value={draft.timeZone}>
                      {draft.timeZone}
                    </option>
                  )}
                </select>
              </div>

              <div className="fx-profile-preference">
                <div>
                  <label htmlFor="profile-email-notifications">
                    Email notification preference
                  </label>
                  <p>
                    This preference is saved locally. Email delivery
                    is not connected.
                  </p>
                </div>

                <input
                  id="profile-email-notifications"
                  className="fx-profile-checkbox"
                  type="checkbox"
                  checked={draft.notifyByEmail}
                  disabled={!editing}
                  onChange={(event) =>
                    updateField('notifyByEmail', event.target.checked)
                  }
                />
              </div>
            </div>
          </section>
        </div>

        <div className="fx-profile-actions">
          {editing ? (
            <>
              <button
                type="button"
                className="fx-profile-cancel"
                onClick={cancelEditing}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="fx-primary-button"
              >
                Save changes
                <span aria-hidden="true">→</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              className="fx-primary-button"
              onClick={beginEditing}
            >
              Edit profile
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>

        <p className="fx-profile-footnote">
          Role and workspace access are read-only in this prototype.
          Passwords are not stored in the browser.
        </p>
      </form>
    </section>
  )
}

function ControlTower({
  onNavigate,
}: {
  onNavigate: (page: WorkflowPage) => void
}) {
  const situation = [
    {
      value: '1',
      label: 'Active disruptions',
      detail: 'NH-44 road closure',
    },
    {
      value: '1',
      label: 'Affected shipments',
      detail: 'TRK-104',
    },
    {
      value: '3',
      label: 'Recovery options',
      detail: 'Candidate strategies',
    },
    {
      value: '0',
      label: 'Open evaluations',
      detail: 'None evaluated',
    },
  ]

  const evaluationProgress = [
    {
      label: 'Scenario data loaded',
      state: 'ready' as const,
      status: 'Ready',
    },
    {
      label: 'Disruption identified',
      state: 'ready' as const,
      status: 'Ready',
    },
    {
      label: 'Recovery evaluation',
      state: 'not-started' as const,
      status: 'Not run',
    },
    {
      label: 'Plan comparison',
      state: 'not-started' as const,
      status: 'Waiting',
    },
    {
      label: 'Human review',
      state: 'not-started' as const,
      status: 'Pending',
    },
  ]

  return (
    <section className="fx-control-tower">
      <header className="fx-page-heading">
        <div>
          <p className="fx-stage-label">STAGE 1 OF 5</p>

          <h1>Control Tower</h1>

          <p className="fx-finding">
            One shipment is at risk, and no recovery plan has
            been evaluated yet.
          </p>
        </div>
      </header>

      <section
        className="fx-situation-line"
        aria-label="Current scenario situation"
      >
        {situation.map((item) => (
          <div
            className="fx-situation-item"
            key={item.label}
          >
            <strong className="fx-situation-value">
              {item.value}
            </strong>

            <span className="fx-situation-label">
              {item.label}
            </span>

            <span className="fx-situation-detail">
              {item.detail}
            </span>
          </div>
        ))}
      </section>

      <section
        className="fx-brief-grid"
        aria-label="Current disruption brief"
      >
        <article className="fx-brief-column">
          <div className="fx-section-heading">
            <h2>Affected shipment</h2>
            <p>
              Delivery details and handling requirements for the
              affected medicine.
            </p>
          </div>

          <div className="fx-ledger">
            <LedgerRow label="Shipment reference">
              {scenario.shipment}
            </LedgerRow>

            <LedgerRow label="Destination">
              {scenario.destination}
            </LedgerRow>

            <LedgerRow label="Cargo">
              Temperature-sensitive IV medicine
            </LedgerRow>

            <LedgerRow label="Quantity">
              {scenario.quantity}
            </LedgerRow>

            <LedgerRow label="Temperature range">
              {scenario.temperature}
            </LedgerRow>

            <LedgerRow label="Delivery deadline">
              {scenario.deadline}
            </LedgerRow>

            <LedgerRow label="Shipment condition">
              <StateMark
                state="at-risk"
                label="At risk"
              />
            </LedgerRow>
          </div>
        </article>

        <article className="fx-brief-column">
          <div className="fx-section-heading">
            <h2>Active disruption</h2>
            <p>
              Reported event and the operational information currently
              available.
            </p>
          </div>

          <div className="fx-ledger">
            <LedgerRow label="Reported disruption">
              {scenario.disruption}
            </LedgerRow>

            <LedgerRow label="Reported at">
              {scenario.eventTime}
            </LedgerRow>

            <LedgerRow label="Event status">
              <StateMark
                state="at-risk"
                label="Active"
              />
            </LedgerRow>

            <LedgerRow label="Affected route">
              NH-44
            </LedgerRow>

            <LedgerRow label="Closure location">
              <UnknownValue />
            </LedgerRow>

            <LedgerRow label="Live traffic feed">
              <StateMark
                state="not-connected"
                label="Not connected"
              />
            </LedgerRow>
          </div>
        </article>
      </section>

      <section className="fx-progress-grid">
        <article className="fx-progress-column">
          <div className="fx-section-heading">
            <h2>Five-stage workflow</h2>
            <p>
              Select a stage to inspect its current workspace.
            </p>
          </div>

          <div className="fx-workflow-list">
            {workflowSteps.map((step) => {
              const Icon = step.icon
              const state =
                step.state === 'Current'
                  ? 'ready'
                  : step.state === 'Next'
                    ? 'next'
                    : 'not-started'

              return (
                <button
                  type="button"
                  className="fx-workflow-row"
                  key={step.number}
                  onClick={() => onNavigate(step.label)}
                  aria-current={
                    step.state === 'Current'
                      ? 'page'
                      : undefined
                  }
                >
                  <span className="fx-workflow-number">
                    {step.number}
                  </span>

                  <span className="fx-workflow-copy">
                    <strong>{step.label}</strong>
                    <span>{step.description}</span>
                  </span>

                  <StateMark
                    state={state}
                    label={step.state}
                  />

                  <Icon
                    className="fx-workflow-nav-icon"
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>
        </article>

        <article className="fx-progress-column">
          <div className="fx-section-heading">
            <h2>Evaluation progress</h2>
            <p>
              Current state of the recovery decision process.
            </p>
          </div>

          <div className="fx-ledger">
            {evaluationProgress.map((item) => (
              <LedgerRow
                label={item.label}
                key={item.label}
              >
                <StateMark
                  state={item.state}
                  label={item.status}
                />
              </LedgerRow>
            ))}
          </div>
        </article>
      </section>

      <section className="fx-system-status">
        <div className="fx-section-heading">
          <h2>System status</h2>
          <p>
            External connections are not represented as active unless
            verified.
          </p>
        </div>

        <div className="fx-ledger">
          <LedgerRow label="SAP HANA Cloud">
            <StateMark
              state="not-connected"
              label="Not verified"
            />
          </LedgerRow>

          <LedgerRow label="Live operational feed">
            <StateMark
              state="not-connected"
              label="Not connected"
            />
          </LedgerRow>
        </div>
      </section>

      <div className="fx-page-action">
        <button
          type="button"
          className="fx-primary-button"
          onClick={() => onNavigate('Disruption Details')}
        >
          Continue to Disruption Details
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}

export default function Dashboard({
  profile,
  onProfileChange,
  onSignOut,
}: DashboardProps) {
  const [activePage, setActivePage] =
    useState<WorkflowPage>('Control Tower')
  const [activeView, setActiveView] =
    useState<'workflow' | 'profile'>('workflow')

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut()
      return
    }

    window.location.reload()
  }

  function navigateToWorkflow(page: WorkflowPage) {
    setActivePage(page)
    setActiveView('workflow')
  }

  const renderActivePage = () => {
    if (activeView === 'profile') {
      return (
        <ProfileScreen
          profile={profile}
          onSave={onProfileChange}
        />
      )
    }

    switch (activePage) {
      case 'Control Tower':
        return (
          <ControlTower
            onNavigate={navigateToWorkflow}
          />
        )

      case 'Disruption Details':
        return (
          <DisruptionDetails
            shipment={scenario.shipment}
            disruption={scenario.disruption}
            destination={scenario.destination}
            quantity={scenario.quantity}
            temperature={scenario.temperature}
            deadline={scenario.deadline}
            eventTime={scenario.eventTime}
            dataSource={scenario.dataSource}
            onContinue={() =>
              navigateToWorkflow('Recovery Comparison')
            }
          />
        )

      case 'Recovery Comparison':
        return (
          <RecoveryComparison
            shipment={scenario.shipment}
            disruption={scenario.disruption}
            destination={scenario.destination}
            quantity={scenario.quantity}
            temperature={scenario.temperature}
            deadline={scenario.deadline}
            onBack={() =>
              navigateToWorkflow('Disruption Details')
            }
            onContinue={() =>
              navigateToWorkflow('RippleGuard')
            }
          />
        )

      case 'RippleGuard':
        return (
          <RippleGuard
            shipment={scenario.shipment}
            disruption={scenario.disruption}
            destination={scenario.destination}
            quantity={scenario.quantity}
            temperature={scenario.temperature}
            deadline={scenario.deadline}
            onBack={() =>
              navigateToWorkflow('Recovery Comparison')
            }
            onContinue={() =>
              navigateToWorkflow('Decision Passport')
            }
          />
        )

      case 'Decision Passport':
        return (
          <DecisionPassport
            shipment={scenario.shipment}
            disruption={scenario.disruption}
            destination={scenario.destination}
            quantity={scenario.quantity}
            temperature={scenario.temperature}
            deadline={scenario.deadline}
            onBack={() =>
              navigateToWorkflow('RippleGuard')
            }
            onReturnToControlTower={() =>
              navigateToWorkflow('Control Tower')
            }
          />
        )

      default:
        return (
          <ControlTower
            onNavigate={navigateToWorkflow}
          />
        )
    }
  }

  return (
    <div className="fx-dashboard-root">
      <aside className="fx-sidebar">
        <div className="fx-sidebar-brand">
          <span className="fx-brand-name">
            FORESIGHTX
          </span>
        </div>

        <div className="fx-sidebar-section-label">
          Workspace
        </div>

        <nav
          className="fx-sidebar-navigation"
          aria-label="Main navigation"
        >
          {workflowSteps.map((step) => {
            const Icon = step.icon
            const isActive =
              activeView === 'workflow' &&
              activePage === step.label

            return (
              <button
                type="button"
                key={step.number}
                className={`fx-sidebar-link ${
                  isActive ? 'is-active' : ''
                }`}
                onClick={() => navigateToWorkflow(step.label)}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="fx-sidebar-step-number">
                  {step.number}
                </span>

                <Icon
                  className="fx-sidebar-link-icon"
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <span className="fx-sidebar-link-label">
                  {step.label}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="fx-sidebar-bottom">
          <button
            type="button"
            className={`fx-account-trigger ${
              activeView === 'profile' ? 'is-active' : ''
            }`}
            onClick={() => setActiveView('profile')}
            aria-current={
              activeView === 'profile' ? 'page' : undefined
            }
            aria-label={`Open profile for ${profile.fullName}`}
          >
            <UserRound
              className="fx-account-icon"
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
            />

            <span className="fx-account-identity">
              <strong>{profile.fullName}</strong>
              <span>{profile.email}</span>
              <span>Demo workspace</span>
            </span>
          </button>

          <button
            type="button"
            className="fx-sidebar-signout"
            onClick={handleSignOut}
          >
            <LogOut
              size={16}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      <div className="fx-dashboard-content">
        <header className="fx-topbar">
          <h2 className="fx-topbar-title">
            {activeView === 'profile'
              ? 'Account profile'
              : 'Operations console'}
          </h2>

          <div className="fx-environment-label">
            <span
              className="fx-environment-mark"
              aria-hidden="true"
            />
            <span>
              Demonstration environment · Simulated data
            </span>
          </div>
        </header>

        <main className="fx-main-content">
          {renderActivePage()}

          <footer className="fx-dashboard-footer">
            <span>FORESIGHTX Intelligence Systems</span>
            <span>
              Prototype · Human approval required · Nothing is executed
              automatically
            </span>
          </footer>
        </main>
      </div>
    </div>
  )
}