import Image from 'next/dist/client/legacy/image'
import Tag from '@/app/components/tag'
import SeenButton from '@/app/components/SeenButton'

export default function ItemCard() {
  return (
    <div>
      <div className="w-44 h-80 bg-tertiary rounded-xl flex items-end relative">
        <Image src="/superman_cover.jpg" layout="fill" className="rounded-xl" />
        <div className="absolute right-3 top-3 rounded-full w-max p-1 bg-tertiary">
          <SeenButton />
        </div>
        <div className="w-44 h-24 bg-black/40 backdrop-blur-2xl rounded-b-xl">
          <div className="mt-2 mx-3">
            <h2 className="text-title font-semibold">Superman</h2>
            <p className="text-paragraph font-extralight text-sm">2025</p>
          </div>

          <div className="mx-3 flex gap-2 overflow-auto">
            <Tag name="Science-Fiction" />
            <Tag name="Action" />
            <Tag name="Comédie" />
          </div>
        </div>
      </div>
    </div>
  )
}
