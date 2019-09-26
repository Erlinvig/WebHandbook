<template lang="pug">
  .container(v-if="page")
    .title.mt1.mb1
      h1 {{title}}
      button(
        @click="markPage"
        :class="{'marked': isMarked}"
        v-if="user"
        )
        span.el-icon-loading(v-if="isMarkState === stateOption.loading")
        i.el-icon-circle-check(v-if="isMarkState === stateOption.default")
        span(v-if="isMarkState === stateOption.default") Изучено
    text-editor.mb1(:options="options")
</template>

<script>
  import TextEditor from '~/components/shared/page/TextEditor'

  export default {
    async mounted() {
      let pageID = this.$route.params.id;

      this.page = await this.$store.dispatch('page/getPageByID', {_id: pageID});

      const user = this.$store.getters['auth/currentUser'];
      if (user) {
        const searchPage = user.pages.find(page => page._id === pageID);
        searchPage
          ? this.isMarked = true
          : this.isMarked = false
      }
    },
    components: {
      TextEditor
    },
    data() {
      return {
        stateOption: {
          default: 'default',
          loading: 'loading'
        },
        isMarkState: 'default',
        isMarked: false,
        page: null,
        error: null,
        mode: 'watch'
      }
    },
    methods: {
      async markPage() {
        this.isMarkState = this.stateOption.loading;
        this.isMarked
          ? await this.$store.dispatch('user/unmarkPage', {pageID: this.page._id})
          : await this.$store.dispatch('user/markPage', {pageID: this.page._id});
        this.isMarked = !this.isMarked;
        this.isMarkState = this.stateOption.default;
      },
    },
    computed: {
      user() {
        return this.$store.getters['auth/currentUser']
      },
      options() {
        return {
          savedTitle: this.page.title,
          savedContent: this.page.content,
          mode: this.mode,
          hideTitle: true
        }
      },
      title() {
        return this.$store.getters['page/getTitle'];
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    background-color: #fff;
    padding: 1em;
    border-radius: .5em;
    border: 1px solid #bebebe;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      cursor: pointer;
      padding: 1em 3em;
      border: 1px solid #bebebe;
      border-radius: 5px;
      transition: .5s;
      margin-right: 1em;
      min-width: 13em;

      i {
        margin-right: .5em;
      }

      i, span {
        color: #797979;
        font-size: 18px;
      }

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        border: 1px solid #797979;
        span, i {
          color: #606c5e;
        }
      }
    }
    .marked {
      background: #cbf1cb;
      border: 1px solid #90c999;
      span, i {
        color: darkgreen;
      }

      &:hover {
        border: 1px solid #001d00;
        span, i {
          color: #001d00;
        }
      }
    }
  }

  @media (max-width: 479px) {
    .title {
      flex-direction: column;

      h1 {
        margin-right: 0;
        margin-bottom: .5em;
      }
    }
  }
</style>
