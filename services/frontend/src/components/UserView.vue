<script setup lang="ts">
import { useStore } from 'vuex';

const store = useStore();
async function logOut() {
  store.dispatch('logOut');
}
const user = computed(() => {
  return store.getters.stateUser == null ? '' : store.getters.stateUser;
});
</script>

<template>
  <div class="">
    <h1 class="font-semibold text-3xl">
      Olá <span class="text-purple-600">{{ user.name }}</span
      >!
    </h1>
    <button
      class="rounded text-center p-3 w-full bg-purple-600 text-white my-4 font-medium"
    >
      <router-link to="/edit-user">Editar usuário</router-link>
    </button>
    <button
      @click="logOut()"
      class="rounded text-center p-3 w-full border border-purple-600 font-medium"
    >
      Logout
    </button>
  </div>
</template>

<style></style>
