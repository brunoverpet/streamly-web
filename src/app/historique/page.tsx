'use client'

import Navbar from '@/app/components/Navbar'
import ItemCard from '@/app/components/ItemCard'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { getHistoric } from '../../../lib/api'
import { ItemCardPropsFromApi } from '@/app/type/ItemCard'
import SearchResults from '@/app/components/SearchResults'
import { formatDateFR } from '@/app/formatDate'

export default function Historique() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchActive, setSearchActive] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const searchValueIsActive = searchValue.trim() !== ''

  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x < -50) {
      router.push('/')
    }
  }

  useEffect(() => {
    getHistoric()
      .then((res) => setItems(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [searchValue])

  function handleRemoveItem(itemId: string) {
    setItems(items.filter((item) => item.idTmdb !== itemId))
  }

  return (
    <div ref={containerRef} className="mt-14">
      <motion.div
        drag="x"
        dragConstraints={containerRef}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        dragDirectionLock={true}
      >
        <div className="mt-16 flex items-center justify-center">
          <Navbar
            searchActive={searchActive}
            onToggleSearch={setSearchActive}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
          />
        </div>

        <div className="mt-14 flex flex-wrap gap-2 justify-center xl:w-3/4 xl:gap-6 xl:mx-auto">
          {searchValueIsActive ? (
            <SearchResults value={searchValue} />
          ) : loading ? (
            // Skeleton loader
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
              {items.map((item: ItemCardPropsFromApi) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <ItemCard
                    id={item.idTmdb}
                    title={item.title}
                    release_date={formatDateFR(item.releaseDate)}
                    backdrop_path={item.backdropPath}
                    genres={item.genres}
                    isSeen={true}
                    onRemove={handleRemoveItem}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-orange-300 font-medium text-xl text-center"
            >
              Ajoutez vos films vus via la barre de recherche pour commencer à recevoir des
              recommandations !
            </motion.h1>
          )}
        </div>
      </motion.div>
    </div>
  )
}
