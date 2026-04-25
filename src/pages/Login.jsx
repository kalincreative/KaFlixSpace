import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, Mail, Lock, AlertCircle } from 'lucide-react'

export default function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 800))

    if (!email || !password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (isSignUp && !name) {
      setError('Please enter your name')
      setLoading(false)
      return
    }

    const isAdmin = email.toLowerCase().includes('admin')

    const user = {
      id: crypto.randomUUID(),
      email,
      name: name || email.split('@')[0],
      isAdmin
    }

    onLogin(user)
    navigate(isAdmin ? '/admin' : '/')
  }

  const demoAdmin = () => {
    const user = {
      id: 'admin-1',
      email: 'admin@kaflix.space',
      name: 'Admin User',
      isAdmin: true
    }
    onLogin(user)
    navigate('/admin')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#F5F5F5]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Building2 className="w-10 h-10 text-[#FF1493]" />
            <span className="text-2xl font-bold text-[#101010]">KaFlix Space</span>
          </Link>
        </div>

        <div className="glass p-8">
          <h2 className="text-2xl font-bold text-[#101010] text-center mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-[#101010]/60 text-center mb-8">
            {isSignUp ? 'Sign up to start booking spaces' : 'Sign in to your account'}
          </p>

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 mb-6">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-[#101010]/80 mb-2">Full Name</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#101010]/40" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#101010]/80 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#101010]/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#101010]/80 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#101010]/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF1493]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF1493] hover:bg-[#D9117F] disabled:bg-[#FF1493]/60 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-[#101010]/60">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-1 text-[#FF1493] hover:underline font-medium"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          {!isSignUp && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-[#101010]/60 text-center mb-4">Demo access</p>
              <button
                onClick={demoAdmin}
                className="w-full bg-[#101010] hover:bg-[#101010]/80 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                Sign in as Admin
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}