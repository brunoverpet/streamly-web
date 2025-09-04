'use client'

import ItemCard from '@/app/components/ItemCard'
import Navbar from '@/app/components/Navbar'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x > 10) {
      router.push('/historique')
    }
  }

  return (
    <div ref={containerRef}>
      <motion.div
        drag="x"
        dragConstraints={containerRef} // utilise le container comme limite
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      >
        <div className="mt-16 flex items-center justify-center">
          <Navbar />
        </div>
        <div className="mt-14 flex gap-2">
          <ItemCard />
          <ItemCard />
        </div>
      </motion.div>
    </div>
  )
}
