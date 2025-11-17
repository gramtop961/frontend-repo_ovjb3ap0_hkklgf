export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Eerlijke prijzen voor elke fase</h2>
          <p className="mt-4 text-gray-600">Transparant en flexibel. Geen verborgen kosten.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Starter",
              price: "€ 10",
              period: "/maand",
              features: [
                "Facturen", "Offertes", "Urenregistratie", "Rapportages"
              ],
              cta: "Start gratis",
              highlight: false
            },
            {
              name: "Professioneel",
              price: "€ 20",
              period: "/maand",
              features: [
                "Alles in Starter", "Bankkoppeling", "Automatische aflettering", "Projecten"
              ],
              cta: "Probeer 30 dagen",
              highlight: true
            },
            {
              name: "Team",
              price: "€ 40",
              period: "/maand",
              features: [
                "Meerdere gebruikers", "Toegangsrechten", "Priority support"
              ],
              cta: "Neem contact op",
              highlight: false
            },
          ].map((plan) => (
            <div key={plan.name} className={`rounded-2xl border ${plan.highlight ? 'border-emerald-500 bg-white shadow-lg' : 'border-gray-200 bg-white'} p-6 flex flex-col`}>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-4 flex items-end gap-1">
                  <div className="text-3xl font-bold">{plan.price}</div>
                  <div className="text-gray-500">{plan.period}</div>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-gray-600">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <a href="#cta" className={`mt-8 w-full text-center px-4 py-2 rounded-md font-medium ${plan.highlight ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-900 text-white hover:bg-black'}`}>{plan.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
