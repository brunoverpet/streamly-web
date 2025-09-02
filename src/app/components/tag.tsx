type TagProps = {
  name: string
}
export default function Tag(props: TagProps) {
  return (
    <div className="w-max h-6 p-2 mt-2.5 bg-card-tag rounded-sm flex items-center">
      <p className="text-white whitespace-nowrap font-light text-sm">{props.name}</p>
    </div>
  )
}
