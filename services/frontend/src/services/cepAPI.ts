import axios from 'axios'
import { Address } from '../interfaces/user'
const BASE_URL = 'https://viacep.com.br/ws'

export async function getAddress(zipcode: string) {
  try {
    let address: Address
    const response = await axios.get(`${BASE_URL}/${zipcode}/json`)

    address = {
      street: response.data.logradouro,
      zipcode: response.data.cep,
      city: response.data.localidade,
      state: response.data.uf
    }

    return address
  } catch (error) {
    throw new Error(
      'Erro ao buscar endereço!'
    )
  }
}