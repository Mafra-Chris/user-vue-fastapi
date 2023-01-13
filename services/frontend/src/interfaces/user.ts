export interface Address {
  country?: string
  state?: string
  city?: string
  zipcode?: string
  street?: string
  home_number?: string
  address_complement?: string
}

export interface User extends Address {
  id?: number
  name?: string
  email?: string
  password?: string
  username?: string
  cpf?: string
  pis?: string
}

