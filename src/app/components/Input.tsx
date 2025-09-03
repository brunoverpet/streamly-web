import { Search } from 'lucide-react'

interface InputProps {
  label?: string
  name: string
  placeholder: string
  type: 'text' | 'email' | 'password'
  withSearchIcon?: boolean
}
export default function Input({
  label,
  name,
  placeholder,
  type,
  withSearchIcon = false,
}: InputProps) {
  return (
    <div className="text-paragraph">
      <span>{label}</span>
      <div className="flex items-center gap-x-1 border-paragraph border-1 rounded-sm p-2">
        {withSearchIcon && <Search className="text-title" />}
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          className="w-full outline-none"
        />
      </div>
    </div>
  )
}
