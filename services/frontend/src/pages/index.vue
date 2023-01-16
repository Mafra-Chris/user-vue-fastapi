<script setup lang="ts">
import { useStore } from 'vuex';
import UserView from '../components/UserView.vue';

const store = useStore();
const isLoggedIn = computed(() => {
  return store.getters.isAuthenticated;
});
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <Login v-if="!isLoggedIn"></Login>
    <UserView v-else></UserView>
  </div>
</template>

<style></style>
