'use client'

import { useEffect, useState } from 'react'
import { searchItem } from '../../../lib/api'
import ItemCard from '@/app/components/ItemCard'
import { motion } from 'motion/react'

type SearchResultItem = {
  id: number
  poster_path: string
  title: string
  release_date: string
  seen: boolean
  watched_id: number | null
}

type SearchResultResponse = {
  page: number
  results: SearchResultItem[]
  total_pages: number
  total_results: number
}

export default function SearchResults({ value }: { value: string }) {
  const [results, setResults] = useState<SearchResultResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!value.trim()) return

    setLoading(true)

    const timer = setTimeout(() => {
      searchItem(value)
        .then((res: SearchResultResponse) => setResults(res))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
    }, 1500)

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

  if (!results) return null

  return (
    <div className="mt-14 flex flex-wrap gap-2 justify-center">
      {results.results.length === 0 ? (
        <div>Aucun résultat</div>
      ) : (
        results.results.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id.toString()}
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
