import { useEffect, useState } from 'react'
import { Euro, Receipt, TrendingUp, Wallet, Plus, RefreshCw } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [seeding, setSeeding] = useState(false)
  const [message, setMessage] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
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

  useEffect(() => {
    load()
  }, [])

  const seedExampleData = async () => {
    setSeeding(true)
    setMessage('')
    setError('')
    try {
      // Voorbeeld facturen
      const invoices = [
        {
          customer_name: 'ACME BV',
          invoice_number: '2025-001',
          issue_date: new Date().toISOString().slice(0, 10),
          due_date: new Date(Date.now() + 1000*60*60*24*14).toISOString().slice(0,10),
          status: 'open',
          items: [
            { description: 'Consultancy', quantity: 10, unit_price: 95, vat_rate: 21 },
            { description: 'Licentiekosten', quantity: 1, unit_price: 299, vat_rate: 21 }
          ],
          notes: 'Bedankt voor uw opdracht.'
        },
        {
          customer_name: 'Delta Holding',
          invoice_number: '2025-002',
          issue_date: new Date().toISOString().slice(0, 10),
          due_date: new Date(Date.now() + 1000*60*60*24*30).toISOString().slice(0,10),
          status: 'betaald',
          items: [
            { description: 'Implementatie', quantity: 5, unit_price: 120, vat_rate: 21 }
          ],
          notes: ''
        },
        {
          customer_name: 'Studio Noord',
          invoice_number: '2025-003',
          issue_date: new Date().toISOString().slice(0, 10),
          due_date: new Date(Date.now() + 1000*60*60*24*7).toISOString().slice(0,10),
          status: 'open',
          items: [
            { description: 'Ontwerp', quantity: 12, unit_price: 80, vat_rate: 9 }
          ],
          notes: 'Graag betalen binnen 7 dagen.'
        }
      ]

      for (const inv of invoices) {
        const r = await fetch(`${API_BASE}/api/invoices`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inv)
        })
        if (!r.ok) throw new Error('Aanmaken van factuur mislukt')
      }

      // Voorbeeld uitgaven
      const expenses = [
        { vendor: 'Bol.com', category: 'Kantoor', description: 'Kantoorartikelen', amount_ex_vat: 85.5, vat_rate: 21, expense_date: new Date().toISOString().slice(0,10) },
        { vendor: 'NS', category: 'Reiskosten', description: 'Treinkaartjes', amount_ex_vat: 42.0, vat_rate: 9, expense_date: new Date().toISOString().slice(0,10) },
        { vendor: 'Coolblue', category: 'Hardware', description: 'Monitor', amount_ex_vat: 199.0, vat_rate: 21, expense_date: new Date().toISOString().slice(0,10) }
      ]

      for (const ex of expenses) {
        const r = await fetch(`${API_BASE}/api/expenses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ex)
        })
        if (!r.ok) throw new Error('Aanmaken van uitgave mislukt')
      }

      setMessage('Voorbeelddata toegevoegd. Dashboard wordt ververst...')
      await load()
    } catch (e) {
      setError(e.message || 'Er ging iets mis bij het toevoegen van data')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <section className="py-14 border-t bg-gray-50" id="dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
            <span className="text-sm text-gray-500">Overzicht van je onderneming</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={load} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-white bg-white text-gray-700">
              <RefreshCw className="h-4 w-4" /> Vernieuwen
            </button>
            <button onClick={seedExampleData} disabled={seeding} className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-700 disabled:opacity-60">
              <Plus className="h-4 w-4" /> {seeding ? 'Bezig...' : 'Voeg voorbeelddata toe'}
            </button>
          </div>
        </div>

        {loading && <div className="text-gray-600">Laden...</div>}
        {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-red-700">{error}</div>}
        {message && <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-emerald-700">{message}</div>}

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
