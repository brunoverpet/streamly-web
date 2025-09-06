'use client'
import { use, useEffect, useState } from 'react'
import ItemCard from '@/app/components/ItemCard'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import ActorCard from '@/app/components/ActorCard'
import { SingleItemInfo } from '@/app/type/ItemCard'
import { getItem } from '../../../../lib/api'
import Tag from '@/app/components/tag'

export default function Media({ params }: { params: Promise<{ id: string }> }) {
  const [item, setItem] = useState<SingleItemInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { id } = use(params)

  useEffect(() => {
    if (!id) return

    setLoading(true)
    getItem(id)
      .then((foundItem) => {
        if (!foundItem) throw new Error(`Item with id ${id} not found`)
        setItem({
          item: {
            id: foundItem.id,
            backdrop_path: foundItem.backdrop_path,
            title: foundItem.title,
            release_date: foundItem.release_date,
            genres: foundItem.genres || [],
          },
          runtime: foundItem.runtime,
          synopsis: foundItem.overview,
          actors: (foundItem.credits.cast || []).slice(0, 3),
          isSeen: foundItem.isSeen,
        })
      })
      .catch((err: any) => setError(err.message || 'Une erreur est survenue'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="text-center mt-16">Chargement...</div>
  if (error) return <div className="text-center mt-16 text-red-500">{error}</div>
  if (!item) return null

  function formatRuntime(runtime: number): string {
    if (!runtime || runtime <= 0) return '0h 0min'
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    return `${hours}h ${minutes}min`
  }

  return (
    <>
      <div>
        <Link href="/">
          <MoveLeft color="var(--color-card-tag)" className="w-12 h-12 xl:cursor-pointer" />
        </Link>
      </div>

      <div className="flex items-center justify-center mt-16">
        <ItemCard
          key={item.item.id}
          id={item.item.id}
          release_date={item.item.release_date}
          title={item.item.title}
          backdrop_path={item.item.backdrop_path}
          genres={item.item.genres}
          withInfo={true}
          isSeen={item.isSeen}
        />
      </div>

      <div>
        <h1 className="text-title font-bold text-xl mt-8">{item.item.title}</h1>
        <div className="flex items-center justify-between text-paragraph font-extralight">
          <span>{item.item.release_date}</span>
          <span>{formatRuntime(Number(item.runtime))}</span>
        </div>

        <div className="mt-4">
          <h2 className="font-medium text-title">Synopsis</h2>
          <p className="text-paragraph font-light mt-1">{item.synopsis}</p>
        </div>

        <div className="mt-4">
          <h2 className="font-medium text-title">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {item.item.genres.map((tag) => (
              <Tag key={tag.id} name={tag.name} />
            ))}
          </div>
        </div>

        <div className="mt-6 w-full">
          <h2 className="font-medium text-title mb-2">Acteurs</h2>
          <div className="flex flex-wrap gap-1.5">
            {item.actors.map((actor) => (
              <ActorCard
                key={actor.name}
                name={actor.name}
                src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
