export interface Address {
  country?: string
  state?: string
  city?: string
  zipcode?: string
  street?: string
  homeNumber?: string
  addressComplement?: string
}

export interface User extends Address {
  id?: number
  name?: string
  email?: string
  password?: string
}

