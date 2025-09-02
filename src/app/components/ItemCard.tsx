import Image from 'next/dist/client/legacy/image'

export default function ItemCard() {
  return (
    <div>
      <div className="w-44 h-80 bg-tertiary rounded-xl flex items-end relative">
        <Image src="/superman_cover.jpg" layout="fill" className="rounded-xl" />
        <div className="w-44 h-24 bg-black/40 backdrop-blur-2xl rounded-b-xl">
          <div className="mt-2 mx-3">
            <h2 className="text-title font-semibold">Superman</h2>
            <p className="text-paragraph font-extralight">2025</p>
          </div>
          <div className="mx-3 mb-3">Mes TAG</div>
        </div>
      </div>
    </div>
  )
}
