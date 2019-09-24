<template lang="pug">
  .container(v-if="page")
    .title.mt1.mb1
      h1 {{title}}
      button(@click="markPage" :class="{'marked': isMarked}")
        i.el-icon-circle-check
        span Изучено
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
        isMarked: false,
        page: null,
        error: null,
        mode: 'watch'
      }
    },
    methods: {
      async markPage() {
        this.isMarked
          ? await this.$store.dispatch('user/unmarkPage', {pageID: this.page._id})
          : await this.$store.dispatch('user/markPage', {pageID: this.page._id});
        this.isMarked = !this.isMarked;
      },
    },
    computed: {
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
      min-width: 11em;

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
        background-color: #efefef;
      }
    }
    .marked {
      background: #cbf1cb;
      border: 1px solid #90c999;
      span, i {
        color: darkgreen;
      }

      &:hover {
        background-color: #e4ffe5;
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
