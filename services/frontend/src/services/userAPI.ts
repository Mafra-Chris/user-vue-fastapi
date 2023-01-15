import axios from "axios";
import { User } from "../interfaces/user";

const BASE_URL = "http://localhost:5000"
const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
})

export async function getUser() {
  try {
    let user: User
    const response = await api.get('/users/whoami')
    user = response.data

    return user
  } catch (error: any) {
    if (error.response.data.detail) {
      throw new Error(
        error.response.data.detail
      )
    } else {
      throw new Error(
        'Erro ao buscar usuário'
      )
    }
  }
}
export async function postUser(form: User) {
  try {

    const response = await api.post('/register', form);

    return response.status
  } catch (error: any) {
    if (error.response.data.detail) {
      throw new Error(
        error.response.data.detail
      )
    } else {
      throw new Error(
        'Erro ao registrar usuário'
      )
    }
  }
}
export async function updateUser(user: User, id: number) {
  try {

    const response = await api.patch(`/user/${id}`, user);

    return response.status
  } catch (error: any) {
    if (error.response.data.detail) {
      throw new Error(
        error.response.data.detail
      )
    } else {
      throw new Error(
        'Erro ao editar usuário'
      )
    }
  }
}
export async function deleteUser(id: number) {
  try {

    const response = await api.delete(`/user/${id}`);

    return response.status
  } catch (error: any) {
    if (error.response.data.detail) {
      throw new Error(
        error.response.data.detail
      )
    } else {
      throw new Error(
        'Erro ao excluir usuário'
      )
    }
  }
}
export async function logInUser(user: User) {

  try {
    const params = new URLSearchParams();
    params.append('username', user.username || '');
    params.append('password', user.password || '');
    const response = await api.post('/login', params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    return response.status
  } catch (error: any) {

    if (error.response.data.detail) {
      throw new Error(
        error.response.data.detail
      )
    } else {
      throw new Error(
        'Erro ao efetuar login!'
      )
    }

  }
}
export async function logOutUser() {
  try {

    const response = await api.delete('/logout');

    return response.status
  } catch (error: any) {
    if (error.response.data.detail) {
      throw new Error(
        error.response.data.detail
      )
    } else {
      throw new Error(
        'Erro ao efetuar logout'
      )
    }
  }
}