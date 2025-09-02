'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const pathname = usePathname()
  const active = pathname.startsWith('/historique') ? 'historique' : '/'

  return (
    <>
      <div className="flex gap-4">
        <Link href="/historique">
          <button
            className={`pb-1 ${active === 'historique' ? 'text-title border-b-2 border-white' : 'border-b-2 border-transparent'}`}
          >
            Historique
          </button>
        </Link>
        <Link href="/">
          <button
            className={`pb-1 ${active === '/' ? 'text-title border-b-2 border-white' : 'border-b-2 border-transparent'}`}
          >
            Explorer
          </button>
        </Link>
      </div>
    </>
  )
}
