'use client'

import Navbar from '@/app/components/Navbar'
import ItemCard from '@/app/components/ItemCard'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { getHistoric } from '../../../lib/api'
import { ItemCardPropsFromApi } from '@/app/type/ItemCard'

export default function Historique() {
  const [searchActive, setSearchActive] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x < -50) {
      router.push('/')
    }
  }
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    getHistoric()
      .then(setItems)
      .catch((err) => console.error(err))
  }, [])


  return (
    <div ref={containerRef} className="mt-14">
      <motion.div
        drag="x"
        dragConstraints={containerRef} // utilise le container comme limite
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        dragDirectionLock={true}
      >
        <div className="">
          {!searchActive && (
            <div className="mt-16 flex items-center justify-center">
              <Navbar />
            </div>
          )}
          <div className="mt-14 flex gap-2">
            {items.length > 0 ? (
              items.map((item: ItemCardPropsFromApi) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  release_date={item.releaseDate}
                  backdrop_path={item.backdropPath}
                  genres={item.genres}
                />
              ))
            ) : (
              <h1 className="text-orange-300 font-medium text-xl">
                Vous n'avez pas encore ajouté de films vu.
              </h1>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
