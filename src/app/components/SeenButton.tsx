'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function SeenButton() {
  const [seen, setSeen] = useState(false)
  return (
    <div onClick={() => setSeen(!seen)}>
      {seen ? <Eye color="white" /> : <EyeOff color="white" />}
    </div>
  )
}
