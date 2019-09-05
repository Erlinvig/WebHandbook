<template lang="pug">
  .content-table(v-if="getCurrentTechnology")
    table
      thead
        tr
          td
            i(class="el-icon-arrow-left")
          td(
            v-for="chapter in getCurrentTechnology.chapters"
            :key="chapter._id"
            ) {{chapter.title}}
          td
            i(class="el-icon-arrow-right")
      tbody
        tr(v-for="(row, index) in getRows" :key="index")
          td
          td(v-for="(page, indexPage) in row" :key="indexPage" v-if="page") {{page.title}}
          td

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

</style>
