'use client'

import { useEffect, useState } from 'react'
import { searchItem } from '../../../lib/api'
import ItemCard from '@/app/components/ItemCard'
import { motion } from 'motion/react'

export default function SearchResults({ value }: { value: string }) {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!value.trim()) return

    setLoading(true)

    //  Debounce avec setTimeout
    const timer = setTimeout(() => {
      searchItem(value)
        .then((res) => setResults(res))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
    }, 1500) // attends 400ms avant d’appeler l’API

    //  Nettoyage si value change avant la fin du timer
    return () => clearTimeout(timer)
  }, [value])

  if (!value.trim()) return null
  if (loading) {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="w-40 h-80 rounded-xl bg-gray-700 animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="mt-14 flex flex-wrap gap-2 justify-center">
      {results.results.length === 0 ? (
        <div>Aucun résultat</div>
      ) : (
        results.results.map((item: any) => (
          <ItemCard
            key={item.id}
            id={item.id}
            backdrop_path={item.poster_path}
            title={item.title}
            release_date={item.release_date}
            genres={[]}
            isSeen={item.seen}
          />
        ))
      )}
    </div>
  )
}
