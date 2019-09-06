<template lang="pug">
  .table(v-if="getCurrentTechnology")
    i.table__navigation(class="el-icon-arrow-left")
    .wrapper
      .table__content
        .column(
          v-for="(chapter, index) in getCurrentTechnology.chapters"
          :key="index"
        )
          .column__title
            span {{chapter.title}}
            i(class="el-icon-edit")
            i(class="el-icon-delete" @click="removeChapter({_id: chapter._id})")
          .column__page(
            v-for="page in chapter.pages"
          )
            span {{page.title}}
            i(class="el-icon-edit")
            i(class="el-icon-delete" @click="removePage({_id: page._id})")
          .column__page-creator(@click="createPage({chapterID: chapter._id})")
            span Создать страницу
        .chapter-creator
          span(@click="createChapter({technologyID: getCurrentTechnology._id})") Создать раздел
    i.table__navigation(class="el-icon-arrow-right")
</template>

<script>
  export default {
    mounted() {
      this.technology = this.$store.getters['content/getCurrentTechnology']

    },
    data() {
      return {
        technologyID: null,
        technology: null
      }
    },
    methods: {
      createPage(payload) {
        this.$store.dispatch('content/createPage', {chapterID: payload.chapterID, title: "Page"})
      },
      removePage(payload) {
        this.$store.dispatch('content/removePage', {_id: payload._id})
      },
      createChapter(payload) {
        this.$store.dispatch('content/createChapter', {technologyID: payload.technologyID, title: "New chapter"})
      },
      removeChapter(payload) {
        this.$store.dispatch('content/removeChapter', {_id: payload._id})
      }
    },
    computed: {
      getCurrentTechnology() {
        return this.$store.getters['content/getCurrentTechnology'];
      },
    }
  }
</script>

<style lang="scss" scoped>
  .table {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
    &__navigation {
      font-size: 16px;
      min-width: 25px;
      text-align: center;
    }
    .wrapper {
      min-width: calc(100% - 50px);
      overflow: hidden;
    }
    &__content {
      display: flex;
      justify-content: flex-start;


      .column {
        min-width: 33.33%;
        &__title, &__page {
          font-size: 16px;
          display: flex;
          justify-content: center;
          span, i {
            font-size: 16px;
          }
          span {
            padding-right: 1.5em;
          }
          i {
            padding-right: .5em;
          }
        }
        &__title {
          font-weight: 700;
          padding-bottom: 5px;
        }
        &__page {
          padding: 5px;
        }
        &__page-creator {
          font-size: 16px;
          display: flex;
          justify-content: center;
          padding: 5px;
          span {
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
