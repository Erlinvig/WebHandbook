<template lang="pug">
  .dialog-wrapper
    .content(is="standard")
    .bg
</template>

<script>
  import standard from './standard'
  export default {
    components: {
      standard
    }
  }
</script>

<style lang="scss" scoped>
  .bg {
    background: #000;
    opacity: .5;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 210;
  }
  .content {
    background-color: #fff;
    border-radius: 5px;
    padding: 1em;
    box-shadow: 0 0 6px rgba(0,0,0,0.6);
    z-index: 215;
  }
</style>
