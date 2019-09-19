<template lang="pug">
  .creator-wrapper
    text-editor

</template>

<script>
  import TextEditor from '../../components/shared/page/TextEditor'

  export default {
    layout: 'admin',
    components: {
      TextEditor
    }
  }
</script>

<style lang="scss">
  .creator-wrapper {
    margin-top: 2em;
    width: 1200px;
  }
</style>
