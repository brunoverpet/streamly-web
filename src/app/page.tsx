'use client'

import ItemCard from '@/app/components/ItemCard'
import Navbar from '@/app/components/Navbar'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { ItemCardProps } from '@/app/type/ItemCard'
import { getRecommandations } from '../../lib/api'
import { formatDateFR } from '@/app/formatDate'
import Logout from '@/app/Logout'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x > 50) {
      router.push('/historique')
    }
  }

  const [items, setItems] = useState<ItemCardProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getRecommandations()
      .then((data) => setItems(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  function handleRemoveItem(itemId: string) {
    setItems(items.filter((item) => item.id !== itemId))
  }

  return (
    <div ref={containerRef}>
      <Logout />
      <motion.div
        drag="x"
        dragConstraints={containerRef}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      >
        <div className="mt-16 flex items-center justify-center">
          <Navbar />
        </div>

        <div className="mt-14 flex gap-2 flex-wrap justify-center xl:w-3/4 xl:gap-6 xl:mx-auto">
          {loading ? (
            // 🟢 Skeleton Loader
            [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="w-40 h-80 rounded-xl bg-gray-700 animate-pulse"
              />
            ))
          ) : items.length > 0 ? (
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  layout
                  key={item.id} // c'est suffisant
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    rotateY: 90,
                    scale: 0.8,
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <ItemCard
                    id={item.id}
                    title={item.title}
                    release_date={formatDateFR(item.release_date)}
                    backdrop_path={item.backdrop_path}
                    genres={item.genres}
                    onRemove={handleRemoveItem}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white opacity-60 text-center"
            >
              Pour que nous puissions vous recommander des films, commencez par ajouter des films
              que vous avez déjà vus via votre historique ou la barre de recherche.
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
