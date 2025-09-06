'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { addWatchedItem, removeWatchedItem } from '../../../lib/api'

interface SeenButtonProps {
  itemId: string
  initialSeen?: boolean
  onToggle?: (itemId: string) => void
}

export default function SeenButton({ itemId, initialSeen = false, onToggle }: SeenButtonProps) {
  const [seen, setSeen] = useState(initialSeen)
  const [loading, setLoading] = useState(false)

  async function handleSeenButton() {
    setLoading(true)
    try {
      if (seen) {
        await removeWatchedItem(itemId)
        toast('Film retiré', {
          description: 'Il a été supprimé de votre historique.',
          duration: 3000,
          style: {
            backgroundColor: '#fbbf24',
            color: '#1f2937',
            fontWeight: 500,
            padding: '12px 16px',
          },
        })
      } else {
        await addWatchedItem(itemId)
        toast('Film ajouté', {
          description: 'Ce film a été ajouté à votre historique.',
          duration: 3000,
          style: {
            backgroundColor: '#60d9ab',
            color: '#1f2937',
            fontWeight: 500,
            padding: '12px 16px',
          },
        })
      }
      setSeen(!seen)
      if (onToggle) onToggle(itemId)
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
