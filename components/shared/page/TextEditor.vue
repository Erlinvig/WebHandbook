<template lang="pug">
  .editor-wrapper
    input.title.mb1(
      placeholder="Заголовок страницы"
      v-model="title"
      )
    client-only
      quill-editor(
        v-model="content"
        :disabled='false'
        )
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        content: ''
      }
    },

    watch: {
      title: function (newValue) {
        this.$store.dispatch('page/updateTitle', {title: newValue})
      },
      content: function (newValue) {
        this.$store.dispatch('page/updateContent', {content: newValue})
      }
    }
  }
</script>

<style>
  .ql-editor {
    min-height: 300px;
  }
</style>

<style lang="scss" scoped>
  .editor-wrapper {
    .title {
      padding: .5em;
      font-size: 18px;
      width: 100%;
      background-color: transparent;
      border: 1px solid #cecece;
    }
  }
</style>
