export interface ItemCardProps {
  withInfo?: boolean
  id: string
  backdrop_path: string
  title: string
  release_date: string
  genres: string[]
}

export interface ItemCardPropsFromApi {
  withInfo?: boolean
  id: string
  backdropPath: string
  title: string
  releaseDate: string
  genres: string[]
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
