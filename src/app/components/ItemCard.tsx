import Image from 'next/dist/client/legacy/image'
import Tag from '@/app/components/tag'
import SeenButton from '@/app/components/SeenButton'
import Link from 'next/link'

type ItemCardProps = {
  withInfo?: boolean
}

export default function ItemCard({ withInfo = false }: ItemCardProps) {
  return (
    <div>
      <div className="w-44 h-80 bg-tertiary rounded-xl flex items-end relative">
        <Link href="/media/1">
          <Image src="/superman_cover.jpg" layout="fill" className="rounded-xl object-cover" />
          <div className="absolute right-3 top-3 rounded-full w-max p-1 bg-tertiary">
            <SeenButton />
          </div>

          {!withInfo && (
            <div className="w-44 h-24 bg-black/40 backdrop-blur-2xl rounded-b-xl">
              <div className="mx-3">
                <h2 className="text-title font-semibold pt-2">Superman</h2>
                <p className="text-paragraph font-extralight text-sm">2025</p>
              </div>

              <div className="mx-3 flex gap-2 overflow-auto">
                <Tag name="Science-Fiction" />
                <Tag name="Action" />
                <Tag name="Comédie" />
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  )
}
