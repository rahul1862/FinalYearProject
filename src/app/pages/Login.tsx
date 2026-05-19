import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    if (result.ok) {
      navigate('/');
    } else {
      setError(result.error ?? 'Login failed.');
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

          <h1 className="text-2xl font-bold text-[#0a0a0a] mb-1">Welcome back</h1>
          <p className="text-sm text-[#71717a] mb-6">Sign in to your account to continue.</p>

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
              <label className="block text-sm text-[#71717a] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={inputCls}
                placeholder="you@email.com"
                autoComplete="email"
                autoFocus
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm text-[#71717a]">Password</label>
                <button
                  type="button"
                  className="text-xs text-[#71717a] hover:text-[#0a0a0a] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`${inputCls} pr-10`}
                  placeholder="••••••••"
                  autoComplete="current-password"
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

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className="w-full py-2.5 bg-[#0a0a0a] text-white text-sm font-medium rounded-lg hover:bg-[#2a2a2a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </motion.button>
          </form>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-[#71717a] mt-5">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[#0a0a0a] hover:underline underline-offset-2">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
