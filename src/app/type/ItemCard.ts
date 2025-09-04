export interface ItemCardProps {
  withInfo?: boolean
  id: string
  src: string
  title: string
  date: string
  tags: string[]
}

export interface Actor {
  name: string
  src: string
}

export interface SingleItemInfo {
  item: ItemCardProps
  duration: string
  synopsis: string
  actors: Actor[]
}
