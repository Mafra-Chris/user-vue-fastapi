<script setup lang="ts">
import { useStore } from 'Vuex';
import UserView from '../components/UserView.vue';

const store = useStore();
const isLoggedIn = computed(() => {
  return store.getters.isAuthenticated;
});
const user = computed(() => {
  return store.getters.stateUser == null ? '' : store.getters.stateUser;
});
</script>

<template>
  <div class="flex justify-center">
    <Login v-if="!isLoggedIn"></Login>
    <UserView v-else></UserView>
  </div>
</template>

<style></style>
