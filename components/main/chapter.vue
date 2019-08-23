<template lang="pug">
  .wrapper
    chapter-title
    chapter-articles
</template>

<script>
  import ChapterTitle from './chapter/ChapterTitle';
  import ChapterArticles from './chapter/ChapterArticles';

  export default {
    components: {
      ChapterTitle,
      ChapterArticles
    },
    data() {
      return {
        windowWidth: null
      }
    },
    methods: {
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
      }
    },
    mounted() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    margin: 1em 0;
  }

</style>
