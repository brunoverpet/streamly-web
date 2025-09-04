'use client'

import Navbar from '@/app/components/Navbar'
import ItemCard from '@/app/components/ItemCard'
import { useRef, useState } from 'react'
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
