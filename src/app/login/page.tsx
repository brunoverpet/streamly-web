'use client'

import Navbar from '@/app/components/Navbar'
import Input from '@/app/components/Input'
import Button from '@/app/components/Button'
import { login } from '../../../lib/api'
import type React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function Page({}: { params: { email: string; password: string } }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    try {
      await login(email, password)
      router.push('/')
    } catch (error: any) {
      if (error.status === 400) {
        toast.error(error.message, { style: { color: 'red' } })
      }
    }
  }

  return (
    <div className="mt-16 flex justify-center">
      <div className="w-full max-w-md lg:max-w-lg">
        <Navbar
          page1Info={{ name: "S'inscrire", url: '/register' }}
          page2Info={{ name: 'Se connecter', url: '/login' }}
        />
        <form onSubmit={handleLogin} method="POST">
          <div className="my-10 flex flex-col gap-y-5">
            <Input
              label="Email"
              name="email"
              placeholder="Entrez votre adresse mail"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Mot de passe"
              name="password"
              placeholder="Entrez votre mot de passe"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <Button name="Se connecter" />
          </div>
        </form>
      </div>
    </div>
  )
}
