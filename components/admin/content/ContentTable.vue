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
            i(class="el-icon-delete")
          .column__page(
            v-for="page in chapter.pages"
          )
            span {{page.title}}
            i(class="el-icon-edit")
            i(class="el-icon-delete")
          .column__page-creator
            span Создать страницу
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
      getMaxChapter() {
        let chapters = this.getCurrentTechnology.chapters;

        let result = chapters.length > 0 ?
          chapters.reduce((result, currentItem, currentIndex, array) => {
            result = currentIndex === 1 ?
              {
                index: 0,
                value: result.pages.length
              } : result;

            return currentItem.pages.length > result.value ?
              {
                index: currentIndex,
                value: currentItem.pages.length
              } : result;
          })
          : { value: null };

        return result.value;
      }
    },
    computed: {
      getCurrentTechnology() {
        return this.$store.getters['content/getCurrentTechnology'];
      },
      getRows() {
        const maxChapter = this.getMaxChapter();
        if (maxChapter) {
          let rows = [];
          for (let i = 0; i < maxChapter; i++) {
            let row = [];
            this.getCurrentTechnology.chapters.forEach(chapter => {
              chapter.pages[i] ? row.push(chapter.pages[i]) : row.push(null)
            });
            rows.push(row)
          }
          return rows
        } else {
          return null
        }
      }
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
