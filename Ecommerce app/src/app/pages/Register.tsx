import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name,      setName]      = useState('');
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [confirm,   setConfirm]   = useState('');
  const [showPw,    setShowPw]    = useState(false);
  const [showConf,  setShowConf]  = useState(false);
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);

  const validate = (): string => {
    if (!name.trim())    return 'Please enter your name.';
    if (!email.trim())   return 'Please enter your email.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirm) return 'Passwords do not match.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setLoading(true);
    const result = await register(name, email, password);
    if (result.ok) {
      navigate('/');
    } else {
      setError(result.error ?? 'Registration failed.');
      setLoading(false);
    }
  };

  const inputCls = "w-full px-3.5 py-2.5 border border-[#e4e4e7] rounded-lg bg-white text-[#0a0a0a] focus:outline-none focus:border-[#0a0a0a] placeholder-[#a1a1aa] text-sm transition-colors";

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white border border-[#e4e4e7] rounded-2xl p-8">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="text-xl font-bold tracking-tight text-[#0a0a0a] hover:opacity-70 transition-opacity mb-8 block"
          >
            Vendr
          </button>

          <h1 className="text-2xl font-bold text-[#0a0a0a] mb-1">Create an account</h1>
          <p className="text-sm text-[#71717a] mb-6">Join Vendr to buy and sell globally.</p>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm text-[#71717a] mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className={inputCls}
                placeholder="Jane Smith"
                autoComplete="name"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm text-[#71717a] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputCls}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm text-[#71717a] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`${inputCls} pr-10`}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-[#0a0a0a] transition-colors"
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#71717a] mb-1.5">Confirm password</label>
              <div className="relative">
                <input
                  type={showConf ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className={`${inputCls} pr-10`}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConf(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-[#0a0a0a] transition-colors"
                  aria-label={showConf ? 'Hide password' : 'Show password'}
                >
                  {showConf ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="w-full py-2.5 bg-[#0a0a0a] text-white text-sm font-medium rounded-lg hover:bg-[#2a2a2a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Creating account…' : 'Create account'}
            </motion.button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-[#71717a] mt-5">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#0a0a0a] hover:underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
