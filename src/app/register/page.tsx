'use client'

import Navbar from '@/app/components/Navbar'
import Input from '@/app/components/Input'
import Button from '@/app/components/Button'
import type React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { register } from '../../../lib/api'

export default function Page() {
  const [lastname, setLastname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    try {
      await register(lastname, firstname, email, password)
      toast.success('Compte créé avec succès !')
      router.push('/login')
    } catch (error: any) {
      if (error.status === 400) {
        toast.error(error.message || 'Erreur lors de l’inscription', {
          style: { color: 'red' },
        })
      }
    }
  }

  return (
    <div>
      <div className="mt-16">
        <h1 className="text-title font-semibold text-2xl mb-2">Créer un compte</h1>
        <span className="text-paragraph font-light text-sm">
          Complétez vos informations pour rejoindre la plateforme
        </span>
      </div>

      <div className="mt-10">
        <Navbar
          page1Info={{ name: "S'inscrire", url: '/register' }}
          page2Info={{ name: 'Se connecter', url: '/login' }}
        />

        <form onSubmit={handleRegister}>
          <div className="my-10 flex flex-col gap-y-5">
            <Input
              label="Nom de famille"
              name="lastname"
              placeholder="Entrez votre nom de famille"
              type="text"
              onChange={(e) => setLastname(e.target.value)}
            />
            <Input
              label="Prénom"
              name="firstname"
              placeholder="Entrez votre prénom"
              type="text"
              onChange={(e) => setFirstname(e.target.value)}
            />
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

          <div className="flex justify-center mb-10">
            <Button name="S'inscrire" />
          </div>
        </form>
      </div>
    </div>
  )
}
