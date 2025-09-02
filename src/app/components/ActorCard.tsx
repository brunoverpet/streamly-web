import Image from 'next/dist/client/legacy/image'

export default function ActorCard() {
  return (
    <div className="flex items-end relative w-28 h-28">
      <Image src="/profil.jpg" layout="fill" className="rounded-xl object-cover" />
      <div className="w-28 h-10 bg-black/40 backdrop-blur-2xl rounded-b-xl">
        <div className="flex items-center justify-center">
          <span className="text-title font-light text-sm truncate px-1.5 py-2">
            Nom de l'acteur avec un texte super long qui ne dépasse jamais
          </span>
        </div>
      </div>
    </div>
  )
}
