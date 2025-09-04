import Image from 'next/dist/client/legacy/image'

interface ActorCardProps {
  name: string
  src: string
}

export default function ActorCard({ name, src }: ActorCardProps) {
  const profilSrc = src || '/profil.jpg'
  return (
    <div className="flex items-end relative w-28 h-28">
      <Image src={profilSrc} layout="fill" className="rounded-xl object-cover" />
      <div className="w-28 h-10 bg-black/40 backdrop-blur-2xl rounded-b-xl">
        <div className="flex items-center justify-center">
          <span className="text-title font-light text-sm truncate px-1.5 py-2">{name}</span>
        </div>
      </div>
    </div>
  )
}
