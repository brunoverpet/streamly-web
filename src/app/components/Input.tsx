import { Search } from 'lucide-react'
import type React from 'react'

interface InputProps {
  label?: string
  name: string
  placeholder: string
  type: 'text' | 'email' | 'password'
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  withSearchIcon?: boolean
}

export default function Input({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
  withSearchIcon = false,
}: InputProps) {
  return (
    <div className="text-paragraph">
      {label && <span>{label}</span>}
      <div className="flex items-center gap-x-1 border-paragraph border-1 rounded-sm p-2">
        {withSearchIcon && <Search className="text-title" />}
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          required
          className="w-full outline-none"
        />
      </div>
    </div>
  )
}
