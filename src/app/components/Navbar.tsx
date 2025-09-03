'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const active = pathname.startsWith('/historique') ? 'historique' : '/'

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-center w-[24px]">
        {active === 'historique' && <Search color="white" />}
      </div>

      <div className="flex gap-4 justify-center flex-1">
        <Link href="/historique">
          <button
            className={`pb-1 ${
              active === 'historique'
                ? 'text-title border-b-2 border-white'
                : 'text-paragraph border-b-2 border-transparent'
            }`}
          >
            Historique
          </button>
        </Link>

        <Link href="/">
          <button
            className={`pb-1 ${
              active === '/'
                ? 'text-title border-b-2 border-white'
                : 'text-paragraph border-b-2 border-transparent'
            }`}
          >
            Explorer
          </button>
        </Link>
      </div>

      {/* Espace de droite pour équilibrer */}
      <div className="w-[24px]" />
    </div>

  )
}
