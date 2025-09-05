'use client'

import ItemCard from '@/app/components/ItemCard'
import Navbar from '@/app/components/Navbar'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { ItemCardProps } from '@/app/type/ItemCard'
import { getRecommandations } from '../../lib/api'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x > 50) {
      router.push('/historique')
    }
  }

  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    getRecommandations()
      .then(setItems)
      .catch((err) => console.error(err))
  }, [])

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
        <div className="mt-14 flex gap-2 flex-wrap">
          {items.map((item: ItemCardProps) => (
            <ItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              release_date={item.release_date}
              backdrop_path={item.backdrop_path}
              genres={item.genres}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
