'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MoveLeft, Search } from 'lucide-react'
import { useState } from 'react'
import Input from '@/app/components/Input'

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

export default function Navbar({
  page1Info = { name: 'Historique', url: 'historique' },
  page2Info = { name: 'Explorer', url: '/' },
}: NavbarProps) {
  const pathname = usePathname()
  const [searchActive, setSearchActive] = useState(false)

  return (
    <div className="flex w-full">
      <div
        className={`flex ${searchActive ? 'gap-x-5 justify-between items-center w-full' : 'justify-center'}`}
      >
        {!searchActive && pathname === '/historique' && (
          <div className="">
            <Search className="text-title" size={30} onClick={() => setSearchActive(true)} />
          </div>
        )}
        {searchActive && pathname === '/historique' && (
          <>
            <div className="">
              <MoveLeft
                color="var(--color-card-tag)"
                className="w-12 h-12 xl:cursor-pointer"
                onClick={() => setSearchActive(false)}
              />
            </div>
            <Input name="search" placeholder="Rechercher" type="text" withSearchIcon={true} />
          </>
        )}
      </div>

      {/*{!searchActive && pathname === '/historique' && <div className="invisible w-1"></div>}*/}

      {!searchActive && (
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
      )}
      {/*<div className="w-[24px]" />*/}
    </div>
  )
}
