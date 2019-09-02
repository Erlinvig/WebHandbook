<template lang="pug">
  .wrapper
    chapter-title(:chapter="chapter")
    chapter-articles(:chapter="chapter")
</template>

<script>
  import ChapterTitle from './chapter/ChapterTitle';
  import ChapterArticles from './chapter/ChapterArticles';

  export default {
    components: {
      ChapterTitle,
      ChapterArticles
    },
    props: ['chapter']

  }
</script>

<style lang="scss" scoped>
</style>
