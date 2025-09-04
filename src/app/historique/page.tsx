'use client'

import Navbar from '@/app/components/Navbar'
import ItemCard from '@/app/components/ItemCard'
import { MoveLeft, Search } from 'lucide-react'
import { useRef, useState } from 'react'
import Input from '@/app/components/Input'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

export default function Historique() {
  const [searchActive, setSearchActive] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x < -50) {
      router.push('/')
    }
  }

  return (
    <div ref={containerRef} className="mt-14">
      <motion.div
        drag="x"
        dragConstraints={containerRef} // utilise le container comme limite
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        dragDirectionLock={true}
        transition={{ type: 'tween', stiffness: 300, damping: 30 }}
      >
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
        <div className="">
          {!searchActive && (
            <div className="mt-16 flex items-center justify-center">
              <Navbar />
            </div>
          )}
          <div className="mt-14 flex gap-2">
            <ItemCard />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
