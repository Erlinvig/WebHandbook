<template lang="pug">
  .creator-wrapper(v-if="page")
    text-editor.mb1(:options="options")
    p {{savedTitle}}
    .actions
      button(@click="changeState")
        span(v-if="mode === modeOption.edit") Режим просмотра
        span(v-if="mode === modeOption.watch") Режим редактирования
      button(@click="updatePage") Обновить
</template>

<script>
  import TextEditor from '~/components/shared/page/TextEditor'

  export default {
    layout: 'admin',
    async mounted() {
      let pageID = this.$route.params.id;

      this.page = await this.$store.dispatch('page/getPageByID', {_id: pageID});
    },
    components: {
      TextEditor
    },
    data() {
      return {
        page: null,
        savedTitle: null,
        savedContent: null,
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
      async updatePage() {
        let pageID = this.$route.params.id;
        let pageData = {
          _id: pageID,
          title: this.$store.getters['page/getTitle'],
          content: this.$store.getters['page/getContent']
        };

        await this.$store.dispatch('content/updatePage', pageData)
      }
    },
    computed: {
      options() {
        return {
          savedTitle: this.page.title,
          savedContent: this.page.content,
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
