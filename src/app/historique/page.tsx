import Navbar from '@/app/components/Navbar'
import ItemCard from '@/app/components/ItemCard'

export default function Historique() {
  return (
    <div>
      <div className="mt-16 flex items-center justify-center">
        <Navbar />
      </div>
      <div className="mt-14 flex gap-2">
        <ItemCard />
      </div>
    </div>
  )
}
