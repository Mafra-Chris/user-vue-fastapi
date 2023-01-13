import axios from "axios";
import { User } from "../interfaces/user";

const BASE_URL = "http://localhost:5000"

export async function getUser() {
  try {
    let user: User
    const response = await axios.get(`${BASE_URL}/users/whoami`)
    user = response.data

    return user
  } catch (error) {
    throw new Error(
      'Erro ao buscar usuário!'
    )
  }
}
export async function postUser(form: User) {
  try {

    const response = await axios.post(`${BASE_URL}/register`, form);

    return response.status
  } catch (error) {
    throw new Error(
      'Erro ao registrar usuário!'
    )
  }
}
export async function updateUser(user: User, id: number) {
  try {

    const response = await axios.patch(`${BASE_URL}/user/${id}`, user);

    return response.status
  } catch (error) {
    throw new Error(
      'Erro ao atualizar usuário!'
    )
  }
}
export async function deleteUser(id: number) {
  try {

    const response = await axios.delete(`${BASE_URL}/user/${id}`);

    return response.status
  } catch (error) {
    throw new Error(
      'Erro ao efetuar login!'
    )
  }
}
export async function logInUser(user: User) {

  try {
    const params = new URLSearchParams();
    params.append('username', user.username || '');
    params.append('password', user.password || '');
    const response = await axios.post(`${BASE_URL}/login`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    return response.status
  } catch (error) {
    throw new Error(
      'Erro ao efetuar login!'
    )
  }
}
export async function logOutUser() {
  try {

    const response = await axios.delete(`${BASE_URL}/logout`);

    return response.status
  } catch (error) {
    throw new Error(
      'Erro ao efetuar logout!'
    )
  }
}