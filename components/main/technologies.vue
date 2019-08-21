<template lang="pug">
  .wrapper
    .container
      ul.technologies
        li.technologies__left(@click="previous")
          i(class="el-icon-arrow-left")
        li.technologies__main
          ul.technologies__list
            li.technologies__item(
              v-for="(technology, index) in technologies"
              :key="index"
            ) {{technology.title}}
        li.technologies__right(@click="next")
          i(class="el-icon-arrow-right")
</template>

<script>
  export default {
    data() {
      return {
        technologies: [
          {title: 'HTML'},
          {title: 'CSS'},
          {title: 'JavaScript'},
          {title: 'NodeJS'},
          {title: 'TypeScript'}
        ]
      }
    },
    methods: {
      next() {

      },
      previous() {

      }
    }
  }
</script>

<style lang="scss" scoped>
.technologies {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5em;
  margin-bottom: 1.5em;

  &__main {
    overflow-x: hidden;
    width: 100%;
  }

  &__list {
    display: flex;
    transform: translateX(0%);
  }

  &__item, &__left, &__right {
    cursor: pointer;
    padding: 1em 0;
    background-color: #fff;
    color: #050619;
    font-size: 22px;
    font-weight: 700;
    border-radius: 5px;
    margin: 0 1%;
  }

  &__item {
    min-width: 23%;
    display: flex;
    justify-content: center;
  }

  &__left, &__right {
    display: flex;
    justify-content: center;
    align-self: center;
    min-width: 2em;
    .el-icon-arrow-left, .el-icon-arrow-right {
      font-size: 100%;
      font-weight: 700;
    }
  }
  &__left {
    margin-left: 0;
  }
  &__right {
    margin-right: 0;
  }
}
</style>
