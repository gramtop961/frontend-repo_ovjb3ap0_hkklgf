import { useEffect, useMemo, useState } from 'react'
import { Euro, Receipt, TrendingUp, Wallet, Plus, RefreshCw, BarChart2, FileText, CreditCard } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [seeding, setSeeding] = useState(false)
  const [message, setMessage] = useState('')

  const [activeTab, setActiveTab] = useState('overzicht')

  // lists
  const [invoices, setInvoices] = useState([])
  const [expenses, setExpenses] = useState([])
  const [listLoading, setListLoading] = useState(false)

  // reports
  const [report, setReport] = useState(null)
  const [reportLoading, setReportLoading] = useState(false)

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

  const loadLists = async () => {
    setListLoading(true)
    setError('')
    try {
      const [ri, re] = await Promise.all([
        fetch(`${API_BASE}/api/invoices`),
        fetch(`${API_BASE}/api/expenses`)
      ])
      if (!ri.ok) throw new Error('Kon facturen niet laden')
      if (!re.ok) throw new Error('Kon uitgaven niet laden')
      const [ji, je] = await Promise.all([ri.json(), re.json()])
      setInvoices(ji)
      setExpenses(je)
    } catch (e) {
      setError(e.message)
    } finally {
      setListLoading(false)
    }
  }

  const loadReport = async () => {
    setReportLoading(true)
    setError('')
    try {
      const y = new Date().getFullYear()
      const res = await fetch(`${API_BASE}/api/reports/monthly?year=${y}`)
      if (!res.ok) throw new Error('Kon rapport niet laden')
      const json = await res.json()
      setReport(json)
    } catch (e) {
      setError(e.message)
    } finally {
      setReportLoading(false)
    }
  }

  useEffect(() => {
    load()
    loadLists()
    loadReport()
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
          issue_date: new Date().toISOString().slice(0, 10),
          due_date: new Date(Date.now() + 1000*60*60*24*14).toISOString().slice(0,10),
          status: 'verzonden',
          items: [
            { description: 'Consultancy', quantity: 10, unit_price: 95, vat_rate: 21 },
            { description: 'Licentiekosten', quantity: 1, unit_price: 299, vat_rate: 21 }
          ],
          notes: 'Bedankt voor uw opdracht.'
        },
        {
          customer_name: 'Delta Holding',
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
          issue_date: new Date().toISOString().slice(0, 10),
          due_date: new Date(Date.now() + 1000*60*60*24*7).toISOString().slice(0,10),
          status: 'verzonden',
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
        { vendor: 'Bol.com', category: 'Kantoor', note: 'Kantoorartikelen', amount_ex_vat: 85.5, vat_rate: 21, expense_date: new Date().toISOString().slice(0,10) },
        { vendor: 'NS', category: 'Reiskosten', note: 'Treinkaartjes', amount_ex_vat: 42.0, vat_rate: 9, expense_date: new Date().toISOString().slice(0,10) },
        { vendor: 'Coolblue', category: 'Hardware', note: 'Monitor', amount_ex_vat: 199.0, vat_rate: 21, expense_date: new Date().toISOString().slice(0,10) }
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
      await Promise.all([load(), loadLists(), loadReport()])
    } catch (e) {
      setError(e.message || 'Er ging iets mis bij het toevoegen van data')
    } finally {
      setSeeding(false)
    }
  }

  return (
    <section className="py-14 border-t bg-gray-50 scroll-mt-24" id="dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Dashboard</h2>
            <span className="text-sm text-gray-500">Overzicht van je onderneming</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { load(); loadLists(); loadReport(); }} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-white bg-white text-gray-700">
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

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <TabButton icon={TrendingUp} active={activeTab==='overzicht'} onClick={() => setActiveTab('overzicht')}>Overzicht</TabButton>
          <TabButton icon={FileText} active={activeTab==='facturen'} onClick={() => setActiveTab('facturen')}>Facturen</TabButton>
          <TabButton icon={CreditCard} active={activeTab==='uitgaven'} onClick={() => setActiveTab('uitgaven')}>Uitgaven</TabButton>
          <TabButton icon={BarChart2} active={activeTab==='rapporten'} onClick={() => setActiveTab('rapporten')}>Rapporten</TabButton>
        </div>

        {activeTab === 'overzicht' && data && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard icon={TrendingUp} title="Omzet (excl. btw)" value={eur(data.revenue_ex_vat)} />
            <StatCard icon={Euro} title="BTW over omzet" value={eur(data.revenue_vat)} />
            <StatCard icon={Wallet} title="Uitgaven (incl. btw)" value={eur(data.expenses_inc_vat)} />
            <StatCard icon={Euro} title="BTW op kosten" value={eur(data.expenses_vat)} />
            <StatCard icon={Receipt} title="Openstaande facturen" value={data.open_invoices} />
            <StatCard icon={Receipt} title="Betaalde facturen" value={data.paid_invoices} />
          </div>
        )}

        {activeTab === 'facturen' && (
          <div className="rounded-xl border bg-white">
            <div className="px-4 py-3 border-b font-medium">Recent aangemaakte facturen</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-2">Klant</th>
                    <th className="text-left px-4 py-2">Datum</th>
                    <th className="text-left px-4 py-2">Status</th>
                    <th className="text-right px-4 py-2">Totaal (excl.)</th>
                  </tr>
                </thead>
                <tbody>
                  {listLoading && (
                    <tr><td colSpan={4} className="px-4 py-4 text-gray-500">Laden...</td></tr>
                  )}
                  {!listLoading && invoices.map((inv, idx) => {
                    const total = calcInvoiceEx(inv)
                    return (
                      <tr key={idx} className="border-t">
                        <td className="px-4 py-2">{inv.customer_name}</td>
                        <td className="px-4 py-2">{formatDate(inv.issue_date)}</td>
                        <td className="px-4 py-2">{statusBadge(inv.status)}</td>
                        <td className="px-4 py-2 text-right">{eur(total)}</td>
                      </tr>
                    )
                  })}
                  {!listLoading && invoices.length === 0 && (
                    <tr><td colSpan={4} className="px-4 py-4 text-gray-500">Nog geen facturen</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'uitgaven' && (
          <div className="rounded-xl border bg-white">
            <div className="px-4 py-3 border-b font-medium">Recent aangemaakte uitgaven</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-2">Leverancier</th>
                    <th className="text-left px-4 py-2">Datum</th>
                    <th className="text-left px-4 py-2">Categorie</th>
                    <th className="text-right px-4 py-2">Bedrag (excl.)</th>
                  </tr>
                </thead>
                <tbody>
                  {listLoading && (
                    <tr><td colSpan={4} className="px-4 py-4 text-gray-500">Laden...</td></tr>
                  )}
                  {!listLoading && expenses.map((ex, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-2">{ex.vendor}</td>
                      <td className="px-4 py-2">{formatDate(ex.expense_date)}</td>
                      <td className="px-4 py-2">{ex.category || '-'}</td>
                      <td className="px-4 py-2 text-right">{eur(ex.amount_ex_vat || 0)}</td>
                    </tr>
                  ))}
                  {!listLoading && expenses.length === 0 && (
                    <tr><td colSpan={4} className="px-4 py-4 text-gray-500">Nog geen uitgaven</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'rapporten' && (
          <div className="rounded-xl border bg-white p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="font-medium">Omzet vs. Uitgaven per maand ({new Date().getFullYear()})</div>
              {reportLoading && <div className="text-sm text-gray-500">Laden...</div>}
            </div>
            {report && <MiniBars data={report.months} />}
            {!report && !reportLoading && <div className="text-gray-500 text-sm">Geen gegevens beschikbaar</div>}
          </div>
        )}
      </div>
    </section>
  )
}

function TabButton({ icon: Icon, active, children, onClick }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm border ${active ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
      <Icon className="h-4 w-4" />
      {children}
    </button>
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

function formatDate(d) {
  if (!d) return '-'
  try {
    // handle ISO string or Date
    const dt = typeof d === 'string' ? new Date(d) : d
    return dt.toLocaleDateString('nl-NL')
  } catch {
    return String(d)
  }
}

function calcInvoiceEx(inv) {
  let ex = 0
  for (const it of (inv.items || [])) {
    ex += (Number(it.quantity || 0) * Number(it.unit_price || 0))
  }
  return ex
}

function statusBadge(status) {
  const map = {
    betaald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    verzonden: 'bg-amber-50 text-amber-700 border-amber-200',
    concept: 'bg-gray-50 text-gray-700 border-gray-200',
    verlopen: 'bg-red-50 text-red-700 border-red-200'
  }
  const cls = map[status] || 'bg-gray-50 text-gray-700 border-gray-200'
  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs rounded-md border ${cls}`}>{status || '-'}</span>
  )
}

function MiniBars({ data }) {
  // Build chart values
  const months = useMemo(() => data.map(m => ({
    label: ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec'][m.month-1],
    revenue: m.revenue_inc_vat,
    expenses: m.expenses_inc_vat
  })), [data])

  const maxVal = Math.max(1, ...months.map(m => Math.max(m.revenue, m.expenses)))

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[720px] grid grid-cols-12 gap-3">
        {months.map((m, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="h-40 w-8 relative flex flex-col justify-end gap-1">
              <div title={`Omzet ${eur(m.revenue)}`} className="w-full bg-emerald-500/80 rounded-sm" style={{ height: `${(m.revenue/maxVal)*100}%` }} />
              <div title={`Uitgaven ${eur(m.expenses)}`} className="w-full bg-blue-500/80 rounded-sm" style={{ height: `${(m.expenses/maxVal)*100}%` }} />
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-wide text-gray-600">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-gray-600">
        <div className="inline-flex items-center gap-2"><span className="h-2 w-3 inline-block bg-emerald-500/80" /> Omzet (incl.)</div>
        <div className="inline-flex items-center gap-2"><span className="h-2 w-3 inline-block bg-blue-500/80" /> Uitgaven (incl.)</div>
      </div>
    </div>
  )
}
