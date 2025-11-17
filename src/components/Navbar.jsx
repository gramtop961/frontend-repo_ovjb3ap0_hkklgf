import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-emerald-500 to-blue-600" />
            <span className="font-semibold text-lg tracking-tight">BGAI.nl</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-700">
            <a href="#features" className="hover:text-gray-900">Functies</a>
            <a href="#pricing" className="hover:text-gray-900">Prijzen</a>
            <a href="#faq" className="hover:text-gray-900">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900">Inloggen</a>
            <a href="#cta" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm">Gratis proberen</a>
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <nav className="grid gap-2 text-sm text-gray-700">
              <a href="#features" className="py-2">Functies</a>
              <a href="#pricing" className="py-2">Prijzen</a>
              <a href="#faq" className="py-2">FAQ</a>
              <a href="#" className="py-2">Inloggen</a>
              <a href="#cta" className="py-2 text-white bg-emerald-600 rounded-md text-center">Gratis proberen</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
