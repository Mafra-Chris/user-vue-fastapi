<script setup lang="ts">
import { SemipolarSpinner } from 'epic-spinners';
</script>

<template>
  <div
    class="flex justify-center items-center h-screen z-50 fixed inset-0 bg-black bg-opacity-80"
  >
    <semipolar-spinner :animation-duration="2000" :size="65" color="#9333ea" />
  </div>
</template>
