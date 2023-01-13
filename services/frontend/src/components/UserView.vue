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
    <h1>Olá {{ user.name }}</h1>
    <button class="rounded-lg px-3 text-center py-1 bg-purple-600 text-white">
      <router-link to="/edit-user">Editar usuário</router-link>
    </button>
    <button
      @click="logOut()"
      class="rounded-lg px-3 text-center py-1 border border-purple-600"
    >
      Logout
    </button>
  </div>
</template>

<style></style>
