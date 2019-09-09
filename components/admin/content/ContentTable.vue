<template lang="pug">
  .table(v-if="getCurrentTechnology")
    i.table__navigation(
      @click="previous"
      class="el-icon-arrow-left"
      :class="{'table__navigation--active': !isStart}"
      )
    .wrapper
      .table__content(:style="{transform: `translateX(${animatedPosition}%)`}")
        .column(
          v-for="(chapter, index) in getCurrentTechnology.chapters"
          :key="index"
        )
          .column__title
            span {{chapter.title}}
            i(class="el-icon-edit")
            i(
              class="el-icon-delete"
              @click="openDialog({type: 'confirmation', message: 'Вы действительно хотите удалить раздел?', actionOK: 'content/removeChapter', actionOKPayload: {_id: chapter._id}})"
            )
          .column__page(
            v-for="page in chapter.pages"
          )
            span {{page.title}}
            i(class="el-icon-edit")
            i(
              class="el-icon-delete"
              @click="openDialog({type: 'confirmation', message: 'Вы действительно хотите удалить страницу?', actionOK: 'content/removePage', actionOKPayload: {_id: page._id}})"
              )
          .column__page-creator(@click="createPage({chapterID: chapter._id})")
            span Создать страницу
        .table__chapter-creator
          button(@click="createChapter({technologyID: getCurrentTechnology._id})") Создать раздел
    i.table__navigation(
      @click="next"
      class="el-icon-arrow-right"
      :class="{'table__navigation--active': !isEnd}"
      )
</template>

<script>
  export default {
    mounted() {
      this.technology = this.$store.getters['content/getCurrentTechnology']

    },
    data() {
      return {
        technologyID: null,
        technology: null,
        countChaptersDisplayed: 0,
        coefficientTranslate: 0,
        position: 0,
        tweenedPosition: 0
      }
    },
    methods: {
      openDialog(payload) {
        this.$store.dispatch('dialog/open', payload)
      },
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
      },
      next() {
        if (!this.isEnd) {
          this.position -= 1;
        }
      },
      previous() {
        if (!this.isStart) {
          this.position += 1;
        }
      }
    },
    computed: {
      isStart() {
        return this.position >= 0
      },
      isEnd() {
        return this.position <= -(this.getCurrentTechnology.chapters.length - this.countChaptersDisplayed + 1)
      },
      getCoefficientAdaptive() {
        return this.$store.getters['adaptive/getCoefficientAdaptive'];
      },
      getCurrentTechnology() {
        return this.$store.getters['content/getCurrentTechnology'];
      },
      animatedPosition() {
        return this.tweenedPosition * this.getCoefficientTranslate;
      },
      getCoefficientTranslate() {
        if (this.getCoefficientAdaptive === 6 || this.getCoefficientAdaptive === 5) {
          this.coefficientTranslate = 33.5;
          this.countChaptersDisplayed = 3;
        } else if(this.getCoefficientAdaptive === 4) {
          this.coefficientTranslate = 50;
          this.countChaptersDisplayed = 2;
        } else if(this.getCoefficientAdaptive === 3) {
          this.coefficientTranslate = 50;
          this.countChaptersDisplayed = 2;
        } else if (this.getCoefficientAdaptive === 2 || this.getCoefficientAdaptive === 1) {
          this.coefficientTranslate = 100;
          this.countChaptersDisplayed = 1;
        }

        return this.coefficientTranslate;
      }
    },
    watch: {
      position: function(newValue) {
        TweenLite.to(this.$data, 0.35, { tweenedPosition: newValue });
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
      padding: 1em 0;
      align-self: center;
      color: #a2a2a2;
      font-size: 16px;
      font-weight: 700;
      min-width: 25px;
      text-align: center;
      &--active {
        cursor: pointer;
        color: #050619;
      }
    }
    .wrapper {
      min-width: calc(100% - 50px);
      overflow: hidden;
    }
    &__content {
      display: flex;
      justify-content: flex-start;

      .column {
        min-width: 33.5%;
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
          padding-bottom: .5em;
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

    &__chapter-creator {
      min-width: 33.5%;
      display: flex;
      flex-direction: column;
      button {
        align-self: center;
        cursor: pointer;
        border: 1px solid #c8cddb;
        padding: .5em 1em;
        border-radius: 1em;
        transition: .5s;
        &:hover {
          background-color: #dafcd3;
        }
      }
    }
  }
</style>
