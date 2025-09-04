'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function SeenButton() {
  const [seen, setSeen] = useState(false)

  function handleSeenButton() {
    setSeen(!seen)
    toast('Seen button clicked')
  }
  return (
    <div onClick={handleSeenButton}>{seen ? <Eye color="white" /> : <EyeOff color="white" />}</div>
  )
}
