<template lang="pug">
  .creator-wrapper
    text-editor.mb1
    .actions
      button() Режим просмотра
      button(@click="createPage") Создать
</template>

<script>
  import TextEditor from '~/components/shared/page/TextEditor'

  export default {
    layout: 'admin',
    components: {
      TextEditor
    },
    methods: {
      createPage() {
        let chapterID = this.$route.params.id;
        let pageData = {
          chapterID,
          title: this.$store.getters['page/getTitle'],
          content: this.$store.getters['page/getContent']
        };

        this.$store.dispatch('content/createPage', pageData)
      }
    }
  }
</script>

<style lang="scss">
  .creator-wrapper {
    margin-top: 2em;
    width: 1200px;

    .actions {
      display: flex;
      justify-content: flex-end;

      button {
        cursor: pointer;
        padding: 1em 3em;
        border: 1px solid #bebebe;
        border-radius: 5px;
        transition: .5s;
        margin-right: 1em;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          background-color: #deffdf;
        }
      }
    }
  }
</style>
