<template lang="pug">
  .creator-wrapper
    text-editor.mb1(:options="options")
    .actions
      button(@click="changeState")
        span(v-if="mode === modeOption.edit") Режим просмотра
        span(v-if="mode === modeOption.watch") Режим редактирования
      button(@click="createPage") Создать
</template>

<script>
  import TextEditor from '~/components/shared/page/TextEditor'

  export default {
    layout: 'admin',
    components: {
      TextEditor
    },
    data() {
      return {
        mode: 'edit',
        modeOption: {
          watch: 'watch',
          edit: 'edit'
        }
      }
    },
    methods: {
      changeState() {
        this.mode === this.modeOption.watch
          ? this.mode = this.modeOption.edit
          : this.mode = this.modeOption.watch
      },
      createPage() {
        let chapterID = this.$route.params.id;
        let pageData = {
          chapterID,
          title: this.$store.getters['page/getTitle'],
          content: this.$store.getters['page/getContent']
        };

        this.$store.dispatch('content/createPage', pageData)
      }
    },
    computed: {
      options() {
        return {
          mode: this.mode
        }
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
