export default function CTA() {
  return (
    <section id="cta" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-600 p-1">
          <div className="rounded-2xl bg-white p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Begin vandaag met BGAI.nl</h3>
              <p className="mt-3 text-gray-600">Probeer 30 dagen gratis. In slechts 5 minuten klaar om je eerste factuur te versturen.</p>
            </div>
            <form className="grid sm:grid-cols-3 gap-3">
              <input placeholder="Jouw e-mailadres" className="sm:col-span-2 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <button className="px-4 py-3 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium">Start gratis proef</button>
              <p className="sm:col-span-3 text-xs text-gray-500">Door je aan te melden ga je akkoord met onze voorwaarden en privacyverklaring.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
