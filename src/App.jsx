import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import CTA from './components/CTA'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <footer className="border-t py-12 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-emerald-500 to-blue-600" />
            <span className="font-semibold">BGAI.nl</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Voorwaarden</a>
            <a href="#faq" className="hover:text-gray-900">Support</a>
          </div>
          <div>© {new Date().getFullYear()} BGAI.nl. Alle rechten voorbehouden.</div>
        </div>
      </footer>
    </div>
  )
}

export default App
