import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Auth() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [token, setToken] = useState(localStorage.getItem('bgai_token') || '')
  const [me, setMe] = useState(null)

  const resetAlerts = () => { setMessage(''); setError('') }

  const onSignup = async (e) => {
    e.preventDefault(); resetAlerts()
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Registratie mislukt')
      setMessage('Account aangemaakt. Je kunt nu inloggen.')
      setMode('login')
    } catch (e) { setError(e.message) }
  }

  const onLogin = async (e) => {
    e.preventDefault(); resetAlerts()
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.detail || 'Inloggen mislukt')
      setToken(json.access_token)
      localStorage.setItem('bgai_token', json.access_token)
      setMessage('Ingelogd!')
      fetchMe(json.access_token)
    } catch (e) { setError(e.message) }
  }

  const fetchMe = async (tk = token) => {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, { headers: { 'Authorization': `Bearer ${tk}` } })
      const json = await res.json()
      if (!res.ok) throw new Error(json.detail || 'Kon profiel niet laden')
      setMe(json)
    } catch (e) { setError(e.message) }
  }

  const onLogout = () => {
    setToken(''); localStorage.removeItem('bgai_token'); setMe(null); setMessage('Uitgelogd')
  }

  return (
    <section id="auth" className="py-16 bg-white border-t">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{mode === 'login' ? 'Inloggen' : 'Account aanmaken'}</h3>
              <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="text-sm text-emerald-700">
                {mode === 'login' ? 'Registreren' : 'Ik heb al een account'}
              </button>
            </div>
            {error && <div className="mb-3 text-sm rounded-md border border-red-200 bg-red-50 text-red-700 p-2">{error}</div>}
            {message && <div className="mb-3 text-sm rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700 p-2">{message}</div>}

            {mode === 'signup' && (
              <form onSubmit={onSignup} className="grid gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Naam</label>
                  <input value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-md border px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">E-mail</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-md border px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Wachtwoord</label>
                  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-md border px-3 py-2" required />
                </div>
                <button className="mt-2 rounded-md bg-emerald-600 text-white px-4 py-2">Aanmaken</button>
              </form>
            )}

            {mode === 'login' && (
              <form onSubmit={onLogin} className="grid gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">E-mail</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-md border px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Wachtwoord</label>
                  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-md border px-3 py-2" required />
                </div>
                <button className="mt-2 rounded-md bg-emerald-600 text-white px-4 py-2">Inloggen</button>
              </form>
            )}
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="text-lg font-semibold mb-2">Status</h3>
            {!token && <p className="text-sm text-gray-600">Niet ingelogd.</p>}
            {token && !me && (
              <div className="grid gap-3">
                <div className="text-sm text-gray-600">Token gevonden. Haal profiel op.</div>
                <div>
                  <button onClick={() => fetchMe()} className="rounded-md border px-3 py-2 text-sm">Profiel ophalen</button>
                  <button onClick={onLogout} className="ml-2 rounded-md border px-3 py-2 text-sm">Uitloggen</button>
                </div>
              </div>
            )}
            {me && (
              <div className="grid gap-2 text-sm">
                <div><span className="text-gray-500">Naam: </span>{me.name}</div>
                <div><span className="text-gray-500">E-mail: </span>{me.email}</div>
                <div className="mt-2">
                  <button onClick={onLogout} className="rounded-md border px-3 py-2 text-sm">Uitloggen</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
