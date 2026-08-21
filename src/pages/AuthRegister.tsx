import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { serviceCategories } from '../data/services';
import { UserPlus, Mail, Lock, Briefcase, Home, Phone, CheckCircle2 } from 'lucide-react';

const DEMO_OTP = '123456';

const roleOptions = [
  {
    value: 'CUSTOMER' as const,
    label: 'Customer',
    description: 'Book services, track orders, and manage your home requests.',
    icon: Home,
  },
  {
    value: 'SERVICE_PROVIDER' as const,
    label: 'Service Provider',
    description: 'Offer your skills, accept jobs, and manage your schedule.',
    icon: Briefcase,
  },
];

export default function AuthRegister() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const [role, setRole] = useState<typeof roleOptions[number]['value']>('CUSTOMER');
  const [profession, setProfession] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const normalizedMobileNumber = mobileNumber.replace(/\s|-/g, '');

  function handleMobileNumberChange(value: string) {
    setMobileNumber(value);
    setOtp('');
    setOtpSent(false);
    setMobileVerified(false);
    setOtpMessage('');
  }

  function sendOtp() {
    if (!/^\+?[1-9]\d{7,14}$/.test(normalizedMobileNumber)) {
      setError('Enter a valid mobile number, including the country code if needed.');
      return;
    }

    setError('');
    setOtpSent(true);
    setMobileVerified(false);
    setOtp('');
    setOtpMessage(`OTP sent to ${mobileNumber}. Demo code: ${DEMO_OTP}`);
  }

  function verifyOtp() {
    if (otp !== DEMO_OTP) {
      setMobileVerified(false);
      setOtpMessage('That OTP is not correct. Please try again.');
      return;
    }

    setMobileVerified(true);
    setOtpMessage('Mobile number verified successfully.');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !mobileNumber.trim() || !password.trim()) {
      setError('Please fill out all required fields.');
      return;
    }

    if (!mobileVerified) {
      setError('Please verify your mobile number with an OTP to continue.');
      return;
    }

    if (role === 'SERVICE_PROVIDER' && !profession.trim()) {
      setError('Please tell us what kind of services you offer.');
      return;
    }

    if (!termsAccepted) {
      setError('You must agree to the terms to continue.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        mobileNumber: normalizedMobileNumber,
        password,
        role,
        profession: profession.trim() || undefined,
        businessName: businessName.trim() || undefined,
      });

      const nextRoute =
        role === 'SERVICE_PROVIDER'
          ? '/provider/dashboard'
          : '/dashboard';

      navigate(nextRoute, { replace: true });
    } catch (err: any) {
      setError(err?.message ?? 'Unable to register.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4 py-8">
      <div className="w-full max-w-xl bg-white border border-[var(--color-border-main)] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Create your account</h1>
            <p className="text-[var(--color-text-muted)]">Choose a role and start with Quick Service.</p>
          </div>
          <div className="w-12 h-12 bg-[var(--color-primary-600)] rounded-2xl flex items-center justify-center text-white">
            <UserPlus size={22} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold text-[var(--color-text-main)]">Choose Your Role</legend>
            <div role="radiogroup" aria-label="Choose your role" className="grid gap-3 sm:grid-cols-2">
              {roleOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = role === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setRole(option.value)}
                    className={`rounded-3xl border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-600)] ${
                      isSelected ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)] shadow-sm' : 'border-[var(--color-border-main)] bg-white hover:border-[var(--color-primary-300)]'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isSelected ? 'bg-[var(--color-primary-600)] text-white' : 'bg-gray-100 text-[var(--color-primary-600)]'}`}>
                        <Icon size={20} />
                      </span>
                      <div>
                        <p className="font-semibold text-[var(--color-text-main)]">{option.label}</p>
                        <p className="text-sm text-[var(--color-text-muted)]">{option.description}</p>
                      </div>
                    </div>
                    <div className="text-xs uppercase tracking-[0.16em] font-semibold text-[var(--color-primary-600)]">
                      {isSelected ? 'Selected' : 'Select'}
                    </div>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full border border-[var(--color-border-main)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-main)] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Email</label>
              <div className="flex items-center gap-2 border border-[var(--color-border-main)] rounded-xl px-3 py-2">
                <Mail size={18} className="text-[var(--color-text-muted)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border-none outline-none text-sm text-[var(--color-text-main)]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Password</label>
            <div className="flex items-center gap-2 border border-[var(--color-border-main)] rounded-xl px-3 py-2">
              <Lock size={18} className="text-[var(--color-text-muted)]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a strong password"
                className="w-full border-none outline-none text-sm text-[var(--color-text-main)]"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Mobile number</label>
              <div className="flex items-center gap-2 border border-[var(--color-border-main)] rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-[var(--color-primary-600)]">
                <Phone size={18} className="text-[var(--color-text-muted)]" />
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={mobileNumber}
                  onChange={(e) => handleMobileNumberChange(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full border-none outline-none text-sm text-[var(--color-text-main)]"
                  aria-describedby="mobile-help"
                />
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={mobileVerified}
                  className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-semibold transition ${mobileVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-800)]'}`}
                >
                  {mobileVerified ? 'Verified' : otpSent ? 'Resend OTP' : 'Send OTP'}
                </button>
              </div>
              <p id="mobile-help" className="mt-2 text-xs text-[var(--color-text-muted)]">We’ll use this number to verify your account.</p>
            </div>

            {otpSent && !mobileVerified && (
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit OTP"
                  className="min-w-0 flex-1 border border-[var(--color-border-main)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-main)] outline-none focus:ring-2 focus:ring-[var(--color-primary-600)]"
                />
                <button type="button" onClick={verifyOtp} className="rounded-xl bg-[var(--color-primary-50)] px-4 py-3 text-sm font-semibold text-[var(--color-primary-800)] hover:bg-[var(--color-primary-100)]">
                  Verify
                </button>
              </div>
            )}

            {otpMessage && (
              <p className={`flex items-center gap-2 text-sm ${mobileVerified ? 'text-emerald-700' : 'text-[var(--color-text-muted)]'}`}>
                {mobileVerified && <CheckCircle2 size={16} />}
                {otpMessage}
              </p>
            )}
          </div>

          {role === 'SERVICE_PROVIDER' && (
            <div className="space-y-4 bg-[var(--color-background)] rounded-3xl border border-[var(--color-border-main)] p-5">
              <h2 className="text-sm font-semibold text-[var(--color-text-main)]">Provider details</h2>
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Business name</label>
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Business or service name"
                  className="w-full border border-[var(--color-border-main)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-main)] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Service category</label>
                <select
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full border border-[var(--color-border-main)] rounded-xl px-4 py-3 text-sm text-[var(--color-text-main)] outline-none"
                >
                  <option value="" disabled>Select a service category</option>
                  {serviceCategories.filter((category) => category !== 'All Services').map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[var(--color-border-main)] text-[var(--color-primary-600)] focus:ring-[var(--color-primary-600)]"
            />
            <label htmlFor="terms" className="text-sm text-[var(--color-text-main)]">
              I agree to the Quick Service <span className="font-semibold">terms of service</span> and <span className="font-semibold">privacy policy</span>.
            </label>
          </div>

          {error && <div className="text-sm text-rose-600">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-2xl px-4 py-3 text-white font-semibold transition ${loading ? 'bg-gray-300 text-gray-600' : 'bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-800)]'}`}
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--color-primary-600)] hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
