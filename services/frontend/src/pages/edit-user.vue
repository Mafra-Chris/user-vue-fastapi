<script setup lang="ts">
import UserForm from '../components/UserForm.vue';
</script>

<template>
  <div class="flex justify-center">
    <div>
      <UserForm formType="update"></UserForm>

      <button>Voltar</button>
    </div>
  </div>
</template>

<style></style>
<route>
  {
    meta: {
      requiresAuth: true
    }
  }
  </route>
