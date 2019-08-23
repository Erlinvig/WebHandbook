<template lang="pug">
  .wrapper
    .container
      ul.technologies
        li.technologies__left(@click="previous")
          i(class="el-icon-arrow-left")
        li.technologies__main
          ul.technologies__list
            li.technologies__item(
              v-for="(technology, index) in getTechnologies"
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
    },
    computed: {
      getTechnologies() {
        return this.$store.getters['content/getTechnologies']
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
    font-size: 23px;
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

@media (min-width: 1280px) {

}

@media (min-width: 992px) and (max-width: 1279px) {

}

@media (min-width: 768px) and (max-width: 991px) {
  .technologies__item {
    min-width: 31.4%;
  }
}

@media (min-width: 480px) and (max-width: 767px) {
  .technologies__item {
    min-width: 48%;
  }
}

@media (min-width: 320px) and (max-width: 479px) {
  .technologies__item {
    min-width: 90%;
    margin: 0 5%;
  }
}

@media (max-width: 319px) {
  .technologies__item {
    min-width: 90%;
    margin: 0 5%;
  }
}
</style>
