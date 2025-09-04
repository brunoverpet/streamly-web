'use client'

import Image from 'next/dist/client/legacy/image'
import Tag from '@/app/components/tag'
import SeenButton from '@/app/components/SeenButton'
import Link from 'next/link'
import { ItemCardProps } from '@/app/type/ItemCard'

export default function ItemCard({
  id,
  title,
  date,
  src,
  tags = [],
  withInfo = false,
}: ItemCardProps) {
  const image = src || '/clean-web-fallback.jpg'
  return (
    <div>
      <div className="w-40 h-80 bg-tertiary rounded-xl flex items-end relative">
        <Link href={`/media/${id}`}>
          <Image src={image} layout="fill" className="rounded-xl object-cover" unoptimized />
          <div
            className="absolute right-3 top-3 rounded-full w-max p-1 bg-tertiary"
            onClick={(e) => e.preventDefault()}
          >
            <SeenButton />
          </div>

          {!withInfo && (
            <div className="w-40 h-24 bg-black/40 backdrop-blur-2xl rounded-b-xl">
              <div className="mx-3">
                <h2 className="text-title font-semibold pt-2 truncate">{title}</h2>
                <p className="text-paragraph font-extralight text-sm truncate">{date}</p>
              </div>

              <div className="mx-3 flex gap-2 overflow-auto">
                {tags.map((name) => (
                  <Tag key={name} name={name} />
                ))}
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  )
}
