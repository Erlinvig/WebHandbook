<template lang="pug">
  .editor-wrapper
    input.title.mb1(placeholder="Заголовок страницы")
    client-only
      quill-editor(
        v-model="content"
        :disabled='true'
        )
    button(@click="showContent") Show
</template>

<script>
  export default {
    data() {
      return {
        content: ''
      }
    },
    methods: {
      showContent() {
        console.log(this.content)
      }
    },
    computed: {
     getContent() {
       return this.content;
     }
    }
  }
</script>

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
