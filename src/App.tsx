import { useState, type FormEvent } from 'react'

import Dashboard, { type UserProfile } from './dashboard'
import './App.css'

type AuthMode = 'signin' | 'create'

const PROFILE_STORAGE_KEY = 'foresightx.profile.v1'


function makeDemoProfile(email = 'demo@foresightx.local'): UserProfile {
  return {
    fullName: 'Operations admin',
    email,
    phone: '',
    team: '',
    department: '',
    timeZone: 'Asia/Kolkata',
    notifyByEmail: false,
  }
}

function readStoredProfile(): UserProfile | null {
  try {
    const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY)

    if (!stored) return null

    const parsed = JSON.parse(stored) as Partial<UserProfile>

    if (
      typeof parsed.fullName !== 'string' ||
      typeof parsed.email !== 'string'
    ) {
      return null
    }

    return {
      fullName: parsed.fullName,
      email: parsed.email,
      phone: typeof parsed.phone === 'string' ? parsed.phone : '',
      team: typeof parsed.team === 'string' ? parsed.team : '',
      department:
        typeof parsed.department === 'string' ? parsed.department : '',
      timeZone:
        typeof parsed.timeZone === 'string'
          ? parsed.timeZone
          : 'Asia/Kolkata',
      notifyByEmail: parsed.notifyByEmail === true,
    }
  } catch {
    return null
  }
}

function storeProfile(profile: UserProfile) {
  try {
    window.localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify(profile),
    )
  } catch {
    // The profile can still be used for the current session.
  }
}

function App() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(
    () => readStoredProfile(),
  )
  const [formError, setFormError] = useState('')

  function handleModeChange(nextMode: AuthMode) {
    setMode(nextMode)
    setFormError('')
    setShowPassword(false)
    setShowConfirmPassword(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '')
      .trim()
      .toLowerCase()
    const password = String(formData.get('password') ?? '')

    if (mode === 'create') {
      const fullName = String(formData.get('fullName') ?? '').trim()
      const confirmPassword = String(
        formData.get('confirmPassword') ?? '',
      )

      if (password.length < 8) {
        setFormError('Use a password with at least 8 characters.')
        return
      }

      if (password !== confirmPassword) {
        setFormError('The passwords do not match.')
        return
      }

      const newProfile: UserProfile = {
        fullName,
        email,
        phone: '',
        team: '',
        department: '',
        timeZone: 'Asia/Kolkata',
        notifyByEmail: false,
      }

      storeProfile(newProfile)
      setProfile(newProfile)
      setShowDashboard(true)
      return
    }

    if (!email || !password) {
      setFormError('Enter your email and password to continue.')
      return
    }

    const savedProfile = readStoredProfile()
    const nextProfile =
      savedProfile?.email.toLowerCase() === email
        ? savedProfile
        : makeDemoProfile(email)

    setProfile(nextProfile)
    setShowDashboard(true)
  }

  function handleDemoAccess() {
    const savedProfile = readStoredProfile()
    const nextProfile = savedProfile ?? makeDemoProfile()

    setProfile(nextProfile)
    setShowDashboard(true)
    setFormError('')
  }

  function handleProfileChange(nextProfile: UserProfile) {
    setProfile(nextProfile)
    storeProfile(nextProfile)
  }

  function handleSignOut() {
    setShowDashboard(false)
    setShowPassword(false)
    setShowConfirmPassword(false)
    setFormError('')
    setMode('signin')
  }

  if (showDashboard && profile) {
    return (
      <Dashboard
        profile={profile}
        onProfileChange={handleProfileChange}
        onSignOut={handleSignOut}
      />
    )
  }

  const isCreatingAccount = mode === 'create'

  return (
    <main className="quiet-auth">
      <header className="quiet-auth__header">
        <div className="quiet-auth__wordmark">
          FORESIGHTX
        </div>

        <div className="quiet-auth__environment">
          <span
            className="quiet-auth__environment-mark"
            aria-hidden="true"
          />
          <span>
            Demonstration environment Â· Simulated data
          </span>
        </div>
      </header>

      <section
        className="quiet-auth__main"
        aria-labelledby="quiet-auth-title"
      >
        <div className="quiet-auth__content">
          <div className="quiet-auth__intro">
            <p className="quiet-auth__eyebrow">
              {isCreatingAccount ? 'CREATE ACCOUNT' : 'SIGN IN'}
            </p>

            <h1
              id="quiet-auth-title"
              className="quiet-auth__title"
            >
              {isCreatingAccount
                ? 'Create your workspace profile.'
                : 'Every decision is recorded.'}
            </h1>
          </div>

          <div
            className="quiet-auth__mode-switch"
            role="tablist"
            aria-label="Account access"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'signin'}
              className={
                mode === 'signin'
                  ? 'quiet-auth__mode-tab is-active'
                  : 'quiet-auth__mode-tab'
              }
              onClick={() => handleModeChange('signin')}
            >
              Sign in
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={mode === 'create'}
              className={
                mode === 'create'
                  ? 'quiet-auth__mode-tab is-active'
                  : 'quiet-auth__mode-tab'
              }
              onClick={() => handleModeChange('create')}
            >
              Create account
            </button>
          </div>

          <form
            className="quiet-auth__form"
            onSubmit={handleSubmit}
          >
            {isCreatingAccount && (
              <div className="quiet-auth__field">
                <label htmlFor="full-name">
                  Full name
                </label>

                <input
                  id="full-name"
                  name="fullName"
                  type="text"
                  placeholder="Your name"
                  autoComplete="name"
                  minLength={2}
                  required
                />
              </div>
            )}

            <div className="quiet-auth__field">
              <label htmlFor="work-email">
                Work email
              </label>

              <input
                id="work-email"
                name="email"
                type="email"
                placeholder="name@company.com"
                autoComplete="email"
                defaultValue={
                  mode === 'signin' ? profile?.email ?? '' : ''
                }
                required
              />
            </div>

            <div className="quiet-auth__field">
              <label htmlFor="work-password">
                Password
              </label>

              <div className="quiet-auth__password">
                <input
                  id="work-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={
                    isCreatingAccount
                      ? 'Create a password'
                      : 'Enter your password'
                  }
                  autoComplete={
                    isCreatingAccount
                      ? 'new-password'
                      : 'current-password'
                  }
                  minLength={isCreatingAccount ? 8 : undefined}
                  required
                />

                <button
                  className="quiet-auth__password-toggle"
                  type="button"
                  aria-pressed={showPassword}
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {isCreatingAccount && (
                <p className="quiet-auth__field-note">
                  Use at least 8 characters.
                </p>
              )}
            </div>

            {isCreatingAccount && (
              <div className="quiet-auth__field">
                <label htmlFor="confirm-password">
                  Confirm password
                </label>

                <div className="quiet-auth__password">
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Enter the password again"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />

                  <button
                    className="quiet-auth__password-toggle"
                    type="button"
                    aria-pressed={showConfirmPassword}
                    onClick={() =>
                      setShowConfirmPassword((current) => !current)
                    }
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
            )}

            {formError && (
              <p
                className="quiet-auth__error"
                role="alert"
              >
                {formError}
              </p>
            )}

            <button
              className="quiet-auth__submit"
              type="submit"
            >
              {isCreatingAccount ? 'Create account' : 'Sign in'}
            </button>
          </form>

          {!isCreatingAccount && (
            <button
              className="quiet-auth__demo-link"
              type="button"
              onClick={handleDemoAccess}
            >
              Continue with demo access
            </button>
          )}

          <div className="quiet-auth__notes">
            {isCreatingAccount ? (
              <>
                <p>
                  This creates a local demonstration profile in this
                  browser.
                </p>
                <p>
                  Your password is not stored. Real authentication is
                  not connected.
                </p>
              </>
            ) : (
              <>
                <p>
                  Demo sign-in does not verify credentials against a
                  server.
                </p>
                <p>
                  Create an account to set up a profile for this
                  browser.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
<footer className="quiet-auth__footer">
        <span>Environment: Demonstration</span>
        <span>Data: Simulated scenario</span>
        <span>Approval: Human review required</span>
      </footer>
    </main>
  )
}

export default App
