'use client'

import { motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const previousPath = useRef<string | null>(null)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  useEffect(() => {
    if (previousPath.current) {
      setDirection(previousPath.current === '/historique' ? 'left' : 'right')
    }
    previousPath.current = pathname
  }, [pathname])

  return (
    <motion.div
      key={pathname}
      initial={{
        opacity: 0,
        x: direction === 'right' ? 100 : -100,
        scale: 0.98,
        filter: 'blur(8px)',
      }}
      animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{
        opacity: 0,
        x: direction === 'right' ? -100 : 100,
        scale: 0.98,
        filter: 'blur(8px)',
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
