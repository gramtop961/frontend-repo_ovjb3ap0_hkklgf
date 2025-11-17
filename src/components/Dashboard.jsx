import { useEffect, useState } from 'react'
import { Euro, Receipt, TrendingUp, Wallet } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/dashboard/summary`)
        if (!res.ok) throw new Error('Kon dashboardgegevens niet laden')
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section className="py-14 border-t bg-gray-50" id="dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
          <span className="text-sm text-gray-500">Overzicht van je onderneming</span>
        </div>

        {loading && <div className="text-gray-600">Laden...</div>}
        {error && <div className="text-red-600">{error}</div>}

        {data && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon={TrendingUp} title="Omzet (excl. btw)" value={eur(data.revenue_ex_vat)} />
            <StatCard icon={Euro} title="BTW over omzet" value={eur(data.revenue_vat)} />
            <StatCard icon={Wallet} title="Uitgaven (incl. btw)" value={eur(data.expenses_inc_vat)} />
            <StatCard icon={Euro} title="BTW op kosten" value={eur(data.expenses_vat)} />
            <StatCard icon={Receipt} title="Openstaande facturen" value={data.open_invoices} />
            <StatCard icon={Receipt} title="Betaalde facturen" value={data.paid_invoices} />
          </div>
        )}
      </div>
    </section>
  )
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-md bg-emerald-50 text-emerald-700 grid place-items-center">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm text-gray-600">{title}</div>
          <div className="text-xl font-semibold text-gray-900">{value}</div>
        </div>
      </div>
    </div>
  )
}

function eur(n) {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(n)
}
