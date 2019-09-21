<template lang="pug">
  .editor-wrapper
    input.title--edit.mb1(
      placeholder="Заголовок страницы"
      v-model="title"
      v-if="options.mode === modeOption.edit"
      )
    span.title--watch(
      v-if="options.mode === modeOption.watch && !options.hideTitle"
    ) {{title}}
    client-only
      quill-editor(
        v-model="content"
        :options="editorOption"
        :disabled='options.mode === modeOption.watch'
        :class="{editorWatch: options.mode === modeOption.watch}"
        )
        .toolbar(
          id="toolbar"
          slot="toolbar"
          v-show="options.mode === modeOption.edit"
          )
          select(class="ql-size")
            option(value="small")
            option(selected)
            option(value="large")
            option(value="huge")
          button.ql-bold
          button.ql-italic
          button.ql-script(value="super")
          button.ql-script(value="sub")
</template>

<script>
  export default {
    props: ['options'],
    mounted() {
      this.title = this.options.savedTitle;
      this.content = this.options.savedContent;
    },
    data() {
      return {
        title: null,
        content: null,
        modeOption: {
          watch: 'watch',
          edit: 'edit'
        },
        editorOption: {
          modules: {
            toolbar: '#toolbar'
          }
        }
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

<style lang="scss">
  .quill-editor {
    background-color: #fff;
    border-radius: .5em;
  }
  .ql-editor {
    min-height: 300px;
  }
  .modeWatch {
    .ql-toolbar .ql-snow {

    }
  }
  .editorWatch {
    border-top: 1px solid #cecece;
  }
</style>

<style lang="scss" scoped>
  .editor-wrapper {
    .title {
      &--edit {
        border: 1px solid #cecece;
        background-color: #fff;
        font-size: 16px;
        padding: .5em;
      }
      &--watch {
        background-color: #fff;
        padding: .5em;
        border-radius: .5rem;
        border: 1px solid #bebebe;
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 1rem;
        display: block;
      }
      &--edit, &--watch {
        width: 100%;
      }
    }
  }
</style>
