export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.18),transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Boekhouden, eenvoudig gemaakt voor Nederland
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              BGAI.nl helpt zzp'ers en mkb's met facturatie, uitgaven, btw-aangifte en rapportages — allemaal in het Nederlands en afgestemd op de Nederlandse regels.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#cta" className="px-6 py-3 rounded-md text-white bg-emerald-600 hover:bg-emerald-700 font-medium shadow">Start gratis proefperiode</a>
              <a href="#features" className="px-6 py-3 rounded-md bg-white text-gray-900 border border-gray-200 hover:border-gray-300 font-medium">Bekijk functies</a>
            </div>
            <div className="mt-6 text-sm text-gray-500">Geen creditcard nodig • Proefperiode van 30 dagen</div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="h-full w-full grid place-items-center p-6">
                <div className="w-full max-w-md">
                  <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500">Factuurvoorbeeld</div>
                    <div className="p-4 text-sm">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-semibold">BGAI.nl</div>
                          <div className="text-gray-500 text-xs">KVK 12345678</div>
                        </div>
                        <div className="text-right text-gray-600">
                          <div>Factuur #2025-001</div>
                          <div>Datum: 17-11-2025</div>
                        </div>
                      </div>
                      <div className="mt-4 border-t pt-3">
                        <div className="flex justify-between text-gray-600">
                          <span>Consultancy</span>
                          <span>€ 1.000,00</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>BTW (21%)</span>
                          <span>€ 210,00</span>
                        </div>
                        <div className="flex justify-between font-semibold mt-2">
                          <span>Totaal</span>
                          <span>€ 1.210,00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-emerald-200/40 blur-xl" />
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-blue-200/40 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
