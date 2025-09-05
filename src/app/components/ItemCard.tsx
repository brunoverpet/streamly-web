'use client'

import Image from 'next/dist/client/legacy/image'
import Tag from '@/app/components/tag'
import SeenButton from '@/app/components/SeenButton'
import { ItemCardProps } from '@/app/type/ItemCard'
import Link from 'next/link'

export default function ItemCard({
  id,
  title,
  release_date,
  backdrop_path,
  genres = [],
  withInfo = false,
  isSeen = false,
}: ItemCardProps) {
  const backdropUrl = `https://image.tmdb.org/t/p/original${backdrop_path}`
  const image = backdropUrl || '/clean-web-fallback.jpg'

  return (
    <div>
      <div className="w-40 h-80 rounded-xl flex items-end relative">
        <Link href={`/media/${id}`}>
          <Image src={image} layout="fill" className="rounded-xl object-cover" priority />
          <div
            className="absolute right-3 top-3 rounded-full w-max p-1 bg-tertiary"
            onClick={(e) => e.preventDefault()}
          >
            <SeenButton itemId={id} initialSeen={isSeen} />
          </div>

          {!withInfo && (
            <div className="w-40 h-24 bg-black/40 backdrop-blur-2xl rounded-b-xl">
              <div className="mx-3">
                <h2 className="text-title font-semibold pt-2 truncate">{title}</h2>
                <p className="text-paragraph font-extralight text-sm truncate">{release_date}</p>
              </div>

              <div className="mx-3 flex gap-2 overflow-auto">
                {genres.map((genre: any) => (
                  <Tag key={genre.id} name={genre.name} />
                ))}
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  )
}
