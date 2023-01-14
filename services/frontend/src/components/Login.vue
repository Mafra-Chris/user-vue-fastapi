<script setup lang="ts">
import { useStore } from 'vuex';
const store = useStore();
const userForm = reactive({ username: '', password: '' });
async function submitLogin() {
  const res = await store.dispatch('logIn', userForm);
}
</script>

<template>
  <div class="">
    <h1>Olá Visitante!</h1>
    <div>
      <form @submit.prevent="submitLogin">
        <div>
          <label for="username">Email, PIS ou CPF</label>
          <input
            type="text"
            name="username"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.username"
          />
        </div>
        <div>
          <label for="password">Senha</label>
          <input
            type="password"
            name="password"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.password"
          />
        </div>
        <button
          class="rounded-lg px-3 text-center py-1 bg-purple-600 text-white"
        >
          Login
        </button>
      </form>
      <span class="block">
        Ainda não tem uma conta?
        <span class="text-purple-600"
          ><router-link to="/register">Cadastre-se</router-link>
        </span>
      </span>
    </div>
  </div>
</template>

<style></style>
