'use client'

import Navbar from '@/app/components/Navbar'
import ItemCard from '@/app/components/ItemCard'
import { MoveLeft, Search } from 'lucide-react'
import { useState } from 'react'
import Input from '@/app/components/Input'

export default function Historique() {
  const [searchActive, setSearchActive] = useState(false)

  return (
    <div className="mt-14">
      {!searchActive ? (
        <div className="absolute left-6 top-11">
          <Search className="text-title" size={30} onClick={() => setSearchActive(true)} />
        </div>
      ) : (
        <>
          <div className="absolute left-6 top-9">
            <MoveLeft
              color="var(--color-card-tag)"
              className="w-12 h-12 xl:cursor-pointer"
              onClick={() => setSearchActive(false)}
            />
          </div>
          <Input name="search" placeholder="Rechercher" type="text" withSearchIcon={true} />
        </>
      )}
      {!searchActive && (
        <div className="mt-16 flex items-center justify-center">
          <Navbar />
        </div>
      )}
      <div className="mt-14 flex gap-2">
        <ItemCard />
      </div>
    </div>
  )
}
