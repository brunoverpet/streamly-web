'use client'
import { use, useEffect, useState } from 'react'
import ItemCard from '@/app/components/ItemCard'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import ActorCard from '@/app/components/ActorCard'
import { SingleItemInfo } from '@/app/type/ItemCard'
import { getItem } from '../../../../lib/api'
import Tag from '@/app/components/tag'
import { formatDateFR } from '@/app/formatDate'

// Type local pour cette page uniquement
type GenreLocal = { id: number; name: string }

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

        // On isole les genres pour l'affichage des Tag
        const genresForTags: GenreLocal[] = foundItem.genres || []
        const genresForCard: string[] = genresForTags.map((g) => g.name)

        setItem({
          item: {
            id: foundItem.id,
            backdrop_path: foundItem.backdrop_path,
            title: foundItem.title,
            release_date: foundItem.release_date,
            genres: genresForCard, // ItemCard attend string[]
          },
          runtime: foundItem.runtime,
          synopsis: foundItem.overview,
          actors: (foundItem.credits.cast || []).slice(0, 3),
          isSeen: foundItem.isSeen,
        })

        // On garde les genres pour les Tag dans un champ temporaire
        setGenresForTags(genresForTags)
      })
      .catch((err: any) => setError(err.message || 'Une erreur est survenue'))
      .finally(() => setLoading(false))
  }, [id])

  // Nouveau state pour les Tag
  const [genresForTags, setGenresForTags] = useState<GenreLocal[]>([])

  if (loading)
    return (
      <div className="mt-16 flex flex-col items-center gap-6 animate-pulse">
        {/* Skeleton pour le bouton retour */}
        <div className="w-12 h-12 bg-gray-300 rounded-full" />

        {/* Skeleton pour l'image principale */}
        <div className="w-full max-w-lg h-96 bg-gray-300 rounded-lg" />

        {/* Skeleton pour le titre */}
        <div className="w-3/4 h-6 bg-gray-300 rounded-md mt-4" />

        {/* Skeleton pour la date et durée */}
        <div className="w-1/2 h-4 bg-gray-300 rounded-md mt-2" />

        {/* Skeleton pour le synopsis */}
        <div className="w-full h-20 bg-gray-300 rounded-md mt-4" />

        {/* Skeleton pour les genres */}
        <div className="flex gap-2 mt-4">
          <div className="w-16 h-6 bg-gray-300 rounded-sm" />
          <div className="w-20 h-6 bg-gray-300 rounded-sm" />
          <div className="w-12 h-6 bg-gray-300 rounded-sm" />
        </div>

        {/* Skeleton pour les acteurs */}
        <div className="flex gap-4 mt-6">
          <div className="w-20 h-28 bg-gray-300 rounded-md" />
          <div className="w-20 h-28 bg-gray-300 rounded-md" />
          <div className="w-20 h-28 bg-gray-300 rounded-md" />
        </div>
      </div>
    )

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
          genres={item.item.genres} // string[]
          withInfo={true}
          isSeen={item.isSeen}
        />
      </div>

      <div>
        <h1 className="text-title font-bold text-xl mt-8">{item.item.title}</h1>
        <div className="flex items-center justify-between text-paragraph font-extralight">
          <span>{formatDateFR(item.item.release_date)}</span>
          <span>{formatRuntime(Number(item.runtime))}</span>
        </div>

        <div className="mt-4">
          <h2 className="font-medium text-title">Synopsis</h2>
          <p className="text-paragraph font-light mt-1">{item.synopsis}</p>
        </div>

        <div className="mt-4">
          <h2 className="font-medium text-title">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {genresForTags.map((tag) => (
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
