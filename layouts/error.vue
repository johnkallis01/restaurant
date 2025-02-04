<script setup>
const router = useRouter();

onMounted(() => {
  router.push('/'); // Redirect to homepage
});
</script>
<template>
    <div>
      <p>Page not found. Redirecting...</p>
    </div>
</template>