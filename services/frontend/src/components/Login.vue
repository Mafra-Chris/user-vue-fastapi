<script setup lang="ts">
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required, email, maxLength } from '@vuelidate/validators';
import { isCPF, isPIS } from '../helpers/validateDocsBr';
import { validateStyle, delayTouch } from '../helpers/validation';
import * as toast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { maskCPF, maskPIS } from '../helpers/strings';
import Loading from './Loading.vue';
const $toast = toast.useToast();
const isLoading = ref(false);
const store = useStore();
const userForm = reactive({ username: '', password: '' });
const rules = computed(() => ({
  username: { required, email, isCPF, isPIS },
  password: { required },
}));
const v$ = useVuelidate(rules, userForm);
const touchMap = new WeakMap();
const isUsernameInvalid = computed(() => {
  if (v$.value.username.$dirty && v$.value.username.required.$invalid) {
    return true;
  }
  if (
    v$.value.username.isCPF.$invalid &&
    v$.value.username.$dirty &&
    v$.value.username.isPIS.$invalid &&
    v$.value.username.email.$invalid
  ) {
    return true;
  }
  return false;
});
function masksUsername(input: string) {
  if (isCPF(input)) {
    userForm.username = maskCPF(input);
  } else if (isPIS(input)) {
    userForm.username = maskPIS(input);
  }
}
async function submitLogin() {
  await v$.value.$validate();
  if (isUsernameInvalid && v$.value.password.$invalid) {
    return;
  }
  try {
    isLoading.value = true;
    await store.dispatch('logIn', userForm);
  } catch (error: any) {
    $toast.open({
      message: error.message,
      type: 'error',
      position: 'top-right',
      duration: 5000,
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="">
    <Loading v-if="isLoading"></Loading>
    <div class="mb-8">
      <h1 class="font-semibold text-3xl">Olá Visitante!</h1>
      <h2 class="text-gray-500 font-medium">
        Bem vindo! Por favor, insira seus dados.
      </h2>
    </div>

    <div>
      <form @submit.prevent="submitLogin">
        <div class="mb-2">
          <label for="username" class="font-semibold">Email, PIS ou CPF</label>
          <input
            type="text"
            name="username"
            class="field w-full"
            v-model="userForm.username"
            @input="delayTouch(v$.username, touchMap)"
            :class="validateStyle(isUsernameInvalid, v$.username.$dirty)"
            @blur="masksUsername(userForm.username)"
          />
          <div v-if="isUsernameInvalid" class="text-red-500">
            <small>Insira um email, PIS ou CPF válido</small>
          </div>
        </div>
        <div>
          <label for="password" class="font-medium">Senha</label>
          <input
            type="password"
            name="password"
            class="field w-full"
            v-model="userForm.password"
            @input="delayTouch(v$.password, touchMap)"
            :class="validateStyle(v$.password.$invalid, v$.password.$dirty)"
          />
          <div
            v-if="v$.password.$invalid && v$.password.$dirty"
            class="text-red-500"
          >
            <small>Campo obrigatório</small>
          </div>
        </div>
        <button
          class="rounded text-center p-3 w-full bg-purple-600 text-white my-4 font-medium"
        >
          Login
        </button>
      </form>
      <span class="block font-medium">
        Ainda não tem uma conta?
        <span class="text-purple-600 font-bold"
          ><router-link to="/register">Cadastre-se</router-link>
        </span>
      </span>
    </div>
  </div>
</template>

<style></style>
