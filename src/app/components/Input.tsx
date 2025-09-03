interface InputProps {
  label: string
  name: string
  placeholder: string
  type: 'text' | 'email' | 'password'
}
export default function Input({ label, name, placeholder, type }: InputProps) {
  return (
    <div className="text-paragraph">
      <span>{label}</span>
      <div className="border-paragraph border-1 rounded-sm p-2">
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
