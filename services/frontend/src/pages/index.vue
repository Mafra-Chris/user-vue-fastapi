<script setup lang="ts">
import { useStore } from 'Vuex';
const store = useStore();
const isLoggedIn = computed(() => {
  return store.getters.isAuthenticated;
});
</script>

<template>
  <div class="text-center">
    <h1>Olá Visitante!</h1>
  </div>
</template>

<style></style>
