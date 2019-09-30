<template lang="pug">
  .creator-wrapper
    .error.mb1(v-if="error")
      i.el-icon-warning-outline
      span {{error}}
    text-editor.mb1(:options="options")
    .actions.mb1
      button(@click="changeState")
        span(v-if="mode === modeOption.edit") Режим просмотра
        span(v-if="mode === modeOption.watch") Режим редактирования
      button(@click="createPage")
        span(v-if="stateSave === stateOption.default") Создать
        span.el-icon-loading(v-if="stateSave === stateOption.loading")
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
        error: null,
        mode: 'edit',
        modeOption: {
          watch: 'watch',
          edit: 'edit'
        },
        stateSave: 'default',
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
      async createPage() {
        let chapterID = this.$route.params.id;
        let pageData = {
          chapterID,
          title: this.$store.getters['page/getTitle'],
          content: this.$store.getters['page/getContent']
        };

        const isFilled = pageData.title && pageData.content;


        if (!isFilled) {
          this.error = 'Все поля должны быть заполены!';
        }
        else {
          this.error = null;

          const user = this.$store.getters['auth/currentUser'];
          this.$store.dispatch('content/guestNotification', { user });

          if (this.stateSave === this.stateOption.default && user.status === 'admin') {
            this.stateSave = this.stateOption.loading;
            await this.$store.dispatch('content/createPage', pageData);
            this.$router.push('/admin/content')
          }
        }
      }
    },
    computed: {
      options() {
        return {
          savedTitle: '',
          savedContent: '',
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
      background-color: #fff;
      padding: 1em;
      border-radius: .5em;
      border: 1px solid #bebebe;

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
