export interface ItemCardProps {
  withInfo?: boolean
  id: string
  backdrop_path: string
  title: string
  release_date: string
  genres: string[]
  isSeen?: boolean
  onRemove?: (itemId: string) => void
}

export interface ItemCardPropsFromApi {
  withInfo?: boolean
  id: string
  idTmdb: string
  backdropPath: string
  title: string
  releaseDate: string
  genres: string[]
}

export interface Actor {
  name: string
  profile_path: string
}

export interface SingleItemInfo {
  item: ItemCardProps
  runtime: string
  synopsis: string
  actors: Actor[]
  isSeen?: boolean
}
