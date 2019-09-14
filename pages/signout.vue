<template></template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('auth/signout');
      this.$router.replace({ path: '/signin' });
    }
  }
</script>
