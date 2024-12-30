<template>
  <div>
    <h1>USER PAGE</h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "user"
})
const userStore = useCurrentUserStore();
</script>

<style>

</style>