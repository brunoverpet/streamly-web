import ItemCard from '@/app/components/ItemCard'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import Tag from '@/app/components/tag'
import ActorCard from '@/app/components/ActorCard'
import items from './../../../../items.json'
import { SingleItemInfo } from '@/app/type/ItemCard'

export default async function Media({ params }: { params: { id: string } }) {
  const { id } = await params

  const foundItem = items.find((i) => i.id === id)

  if (!foundItem) {
    throw new Error(`Item with id ${id} not found`)
  }

  const item: SingleItemInfo = {
    item: {
      id: foundItem.id,
      src: foundItem.src,
      title: foundItem.title,
      date: foundItem.date,
      tags: foundItem.tags,
    },
    duration: foundItem.duration,
    synopsis: foundItem.synopsis,
    actors: foundItem.actors,
  }

  return (
    <>
      <div className="">
        <Link href="/">
          <MoveLeft color="var(--color-card-tag)" className="w-12 h-12 xl:cursor-pointer" />
        </Link>
      </div>
      <div className="flex items-center justify-center mt-16">
        <ItemCard
          key={id}
          id={id}
          date={item.item.date}
          title={item.item.title}
          src={item.item.src}
          tags={item.item.tags}
          withInfo={true}
        />
      </div>
      <div>
        <h1 className="text-title font-bold text-xl mt-8">{item.item.title}</h1>
        <div className="flex items-center justify-between text-paragraph font-extralight">
          <span>{item.item.date}</span>
          <span>1:58:00</span>
        </div>
        <div className="mt-4">
          <h2 className="font-medium text-title">Synopsis</h2>
          <p className="text-paragraph font-light mt-1">{item.synopsis}</p>
        </div>
        <div className="mt-4">
          <h2 className="font-medium text-title">Genres</h2>
          <div className="flex flex-wrap gap-2">
            {item.item.tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        </div>
        <div className="mt-6 w-full">
          <h2 className="font-medium text-title mb-2">Acteurs</h2>
          <div className="flex flex-wrap gap-1.5">
            {item.actors.map((actor) => (
              <ActorCard key={actor.name} name={actor.name} src={actor.src} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
