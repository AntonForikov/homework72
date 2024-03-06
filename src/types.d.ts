export interface ContactToSend {
  name: string,
  phone: string,
  email: string,
  photo: string
}

export interface ContactsFromApi {
  [id: string]: ContactToSend
}

export interface ContactWithId extends ContactToSend {
  id?: string
}