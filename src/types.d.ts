export interface DishToSend {
  tittle: string,
  price: number,
  image: string
}

export interface DishesFromApi {
  [id: string]: DishToSend
}

export interface DishWithId extends DishToSend {
  id: string
}