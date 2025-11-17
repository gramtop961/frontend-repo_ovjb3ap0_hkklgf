import { CheckCircle2, FileText, Receipt, PieChart, Banknote, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Facturatie",
    desc: "Maak professionele facturen in seconden met iDEAL-betaallinks.",
  },
  {
    icon: Receipt,
    title: "Uitgaven",
    desc: "Scan bonnetjes en houd je kosten automatisch bij.",
  },
  {
    icon: PieChart,
    title: "BTW & Rapportages",
    desc: "Krijg realtime inzicht en doe je btw-aangifte snel en foutloos.",
  },
  {
    icon: Banknote,
    title: "Bankkoppeling",
    desc: "Koppel je bank voor automatische aflettering.",
  },
  {
    icon: ShieldCheck,
    title: "Veiligheid",
    desc: "Bank-grade beveiliging en AVG-conform.",
  },
  {
    icon: CheckCircle2,
    title: "Ondersteuning",
    desc: "Nederlandstalige support door experts.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Alles wat je nodig hebt om je boekhouding te regelen</h2>
          <p className="mt-4 text-gray-600">Slimme automatisering, Nederlandse regels en een heldere interface. BGAI.nl is gebouwd voor ondernemers in Nederland.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({icon:Icon, title, desc}) => (
            <div key={title} className="rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow bg-gray-50/50">
              <Icon className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
