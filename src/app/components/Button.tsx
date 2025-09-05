'use client'

interface ButtonProps {
  name: string
}
export default function Button({ name }: ButtonProps) {
  return (
    <button
      // onClick={() => {
      //   toast('This is a toast', { icon: <ArrowDown /> })
      // }}
      className="bg-card-tag p-3 rounded-lg text-title flex items-center w-max"
    >
      {name}
    </button>
  )
}
