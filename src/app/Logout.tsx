'use client'

import { LogOut } from 'lucide-react'
import ViewportPortal from '@/app/ViewportPortal'
import { logout } from '../../lib/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    router.push('/login')
    toast.success('Déconnexion réussi.')
  }

  return (
    <ViewportPortal>
      <button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={handleLogout}
        className="fixed z-[100] top-[calc(1rem+env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))]
                     rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white backdrop-blur
                     hover:bg-white/20"
      >
        <LogOut color="red" />
      </button>
    </ViewportPortal>
  )
}
