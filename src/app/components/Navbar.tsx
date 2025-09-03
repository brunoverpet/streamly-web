'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Search } from 'lucide-react'

interface NavbarProps {
  page1Info?: {
    name: string
    url: string
  }
  page2Info?: {
    name: string
    url: string
  }
}

export default function Navbar({ page1Info = {name: "Historique", url : "historique"}, page2Info = {name: "Explorer", url : "/"}}: NavbarProps) {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-center w-[24px]">
        {pathname === 'historique' && <Search color="white" />}
      </div>

      <div className="flex gap-4 justify-center flex-1">
        <Link href={page1Info.url}>
          <button
            className={`pb-1 ${
              pathname === '/historique' || pathname === '/register'
                ? 'text-title border-b-2 border-white'
                : 'text-paragraph border-b-2 border-transparent'
            }`}
          >
            {page1Info.name}
          </button>
        </Link>

        <Link href={page2Info.url}>
          <button
            className={`pb-1 ${
              pathname === '/' || pathname === '/login'
                ? 'text-title border-b-2 border-white'
                : 'text-paragraph border-b-2 border-transparent'
            }`}
          >
            {page2Info.name}
          </button>
        </Link>
      </div>

      {/* Espace de droite pour équilibrer */}
      <div className="w-[24px]" />
    </div>

  )
}
