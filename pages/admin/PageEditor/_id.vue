<template lang="pug">
  .creator-wrapper(v-if="page")
    .error.mb1(v-if="error")
      i.el-icon-warning-outline
      span {{error}}
    .success.mb1(v-if="success")
      i.el-icon-circle-check
      span {{success}}
    text-editor.mb1(:options="options")
    p {{savedTitle}}
    .actions.mb1
      button(@click="changeState")
        span(v-if="mode === modeOption.edit") Режим просмотра
        span(v-if="mode === modeOption.watch") Режим редактирования
      button(@click="updatePage")
        span(v-if="stateUpdate === stateOption.default || stateUpdate === stateOption.success") Обновить
        span.el-icon-loading(v-if="stateUpdate === stateOption.loading")
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
        error: null,
        success: null,
        page: null,
        savedTitle: null,
        savedContent: null,
        mode: 'edit',
        modeOption: {
          watch: 'watch',
          edit: 'edit'
        },
        stateUpdate: 'default',
        stateOption: {
          default: 'default',
          loading: 'loading',
          success: 'success'
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

        const isFilled = pageData.title && pageData.content;

        if (!isFilled) {
         this.error = 'Все поля должны быть заполены!';
         this.success = null;
        }
        else {
         this.error = null;
         if (this.stateUpdate === this.stateOption.default || this.stateUpdate === this.stateOption.success) {
           this.stateUpdate = this.stateOption.loading;
           await this.$store.dispatch('content/updatePage', pageData);
           this.stateUpdate = this.stateOption.success;
           this.error = null;
           this.success = 'Страница успешно обновлена'
         }
        }
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
        min-width: 11em;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          background-color: #deffdf;
        }
      }
    }

    .error {
      border: 1px solid #ff8675;
      background-color: #ffe2d6;
      padding: .5em;
      display: flex;
      align-items: center;

      i {
        font-size: 25px;
        color: #7f0000;
        margin-right: .5em;
      }
      span {
        color: #7f0000;
      }
    }

    .success {
      border: 1px solid #a7ffab;
      background-color: #deffdf;
      padding: .5em;
      display: flex;
      align-items: center;

      i {
        font-size: 25px;
        color: #009200;
        margin-right: .5em;
      }
      span {
        color: #009200;
      }
    }
  }

  @media (max-width: 479px) {
    .actions {
      flex-direction: column;

      button {
        &:first-child {
          margin-right: 0;
          margin-bottom: 1em;
        }
      }
    }
  }
</style>
