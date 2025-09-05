'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { addWatchedItem, removeWatchedItem } from '../../../lib/api'

interface SeenButtonProps {
  itemId: string
  initialSeen?: boolean
}

export default function SeenButton({ itemId, initialSeen = false }: SeenButtonProps) {
  const [seen, setSeen] = useState(initialSeen)
  const [loading, setLoading] = useState(false)

  async function handleSeenButton() {
    setLoading(true)
    try {
      if (seen) {
        await removeWatchedItem(itemId)
        toast.success('Film retiré des vus')
      } else {
        await addWatchedItem(itemId)
        toast.success('Film ajouté aux vus')
      }
      setSeen(!seen)
    } catch (err) {
      console.error(err)
      toast.error("Erreur lors de l'action")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleSeenButton} disabled={loading} className="p-1">
      {seen ? <Eye color="white" /> : <EyeOff color="white" />}
    </button>
  )
}
