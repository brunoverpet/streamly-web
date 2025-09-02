import ItemCard from '@/app/components/ItemCard'
import { MoveLeft } from 'lucide-react'
import Link from 'next/link'
import Tag from '@/app/components/tag'
import ActorCard from '@/app/components/ActorCard'

export default function Media() {
  return (
    <>
      <div className="absolute left-6 top-9">
        <Link href="/">
          <MoveLeft color="var(--color-card-tag)" className="w-12 h-12 xl:cursor-pointer" />
        </Link>
      </div>
      <div className="flex items-center justify-center mt-16">
        <ItemCard withInfo={true} />
      </div>
      <div>
        <h1 className="text-title font-bold text-xl mt-8">Superman</h1>
        <div className="flex items-center justify-between text-paragraph font-extralight">
          <span>Aug 22, 2025</span>
          <span>1:58:00</span>
        </div>
        <div className="mt-4">
          <h2 className="font-medium text-title">Synopsis</h2>
          <p className="text-paragraph font-light mt-1">
            A group of senior sleuths passionate about solving cold cases get plunged into a
            real-life murder mystery in this comic crime caper.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="font-medium text-title">Genres</h2>
          <div className="flex flex-wrap gap-2">
            <Tag name="Comedy" />
            <Tag name="Drama" />
            <Tag name="Thriller" />
            <Tag name="Mistery" />
            <Tag name="Crime" />
          </div>
        </div>
        <div className="mt-6 w-full">
          <h2 className="font-medium text-title mb-2">Acteurs</h2>
          <div className="flex flex-wrap gap-1.5">
            <ActorCard />
            <ActorCard />
            <ActorCard />
            <ActorCard />
          </div>
        </div>
      </div>
    </>
  )
}
