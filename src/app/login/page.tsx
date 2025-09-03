'use client'

import Navbar from '@/app/components/Navbar'
import Input from '@/app/components/Input'
import Button from '@/app/components/Button'

export default function Page() {
  return (
    <div>
      <div className="mt-16">
        <h1 className="text-title font-semibold text-2xl mb-2">Connectez vous à votre compte</h1>
        <span className="text-paragraph font-light text-sm">
          Heureux de vous revoir, saisissez vos identifiants
        </span>
      </div>
      <div className="mt-10">
        <Navbar
          page1Info={{ name: "S'inscrire", url: '/register' }}
          page2Info={{ name: 'Se connecter', url: '/login' }}
        />
        <div className="my-10 flex flex-col gap-y-5">
          <Input label="Email" name="email" placeholder="Entrez votre adresse mail" type="email" />
          <Input
            label="Mot de passe"
            name="password"
            placeholder="Entrez votre mot de passe"
            type="password"
          />
        </div>
        <div className="flex justify-center">
          <Button name="Se connnecter" />
        </div>
      </div>
    </div>
  )
}
