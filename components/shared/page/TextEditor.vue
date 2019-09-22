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
          select(class="ql-header")
            option(value='1')
            option(value='2')
            option(value='3')
            option(value='4')
            option(value='5')
            option(value='6')
            option(selected='selected')
          select(class="ql-align")
          select.ql-font
            option(selected='selected')
            option(value='serif')
            option(value='monospace')
          button.ql-bold
          button.ql-italic
          button.ql-code-block
          button.ql-blockquote
          button.ql-list(value="ordered")
          button.ql-list(value="bullet")
          button.ql-script(value="super")
          button.ql-script(value="sub")
          button.ql-indent(value="-1")
          button.ql-indent(value="+1")
          select(class="ql-color")
          select(class="ql-background")

</template>

<script>
  import hljs from 'highlight.js';
  hljs.configure({
    languages: ['javascript', 'ruby', 'python', "html", "css"]
  });

  export default {
    props: ['options'],
    mounted() {
      this.title = this.options.savedTitle;
      this.content = this.options.savedContent;
    },
    data() {
      return {
        title: null,
        content: '',
        modeOption: {
          watch: 'watch',
          edit: 'edit'
        },
        editorOption: {
          modules: {
            toolbar: '#toolbar',
            syntax: {
             highlight: text => hljs.highlightAuto(text).value
            }
          }
        }
      }
    },
    computed: {
      contentCode() {
        return hljs.highlightAuto(this.content).value
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
  .ql-editor {
    font-size: 16px;

    h1, h2, h3 {
      margin-bottom: .5rem;
    }
    h4, h5, h6 {
      margin-bottom: .3rem;
    }
  }
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

  .ql-container {
    overflow: auto;
    height: 65vh;
  }

  .editorWatch {
    border-top: 1px solid #cecece;
    .ql-container {
      overflow: auto;
      height: 100%;
    }
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
