<template lang="pug">
  .table(v-if="getCurrentTechnology")
    .table__navigation
      .box
        i(
          @click="previous"
          class="el-icon-arrow-left"
          :class="{'active': !isStart}"
          )
    .wrapper
      .table__content(:style="{transform: `translateX(${animatedPosition}%)`}")
        .column(
          v-for="(chapter, index) in getCurrentTechnology.chapters"
          :key="index"
        )
          .column__title
            span {{chapter.title}}
            .actions
              i(class="el-icon-edit")
              i(
                class="el-icon-delete"
                @click="openDialog({type: 'confirmation', message: 'Вы действительно хотите удалить раздел?', actionOK: 'content/removeChapter', actionOKPayload: {_id: chapter._id}})"
              )
          .column__page(
            v-for="page in chapter.pages"
          )
            span {{page.title}}
            .actions
              i(class="el-icon-edit")
              i(
                class="el-icon-delete"
                @click="openDialog({type: 'confirmation', message: 'Вы действительно хотите удалить страницу?', actionOK: 'content/removePage', actionOKPayload: {_id: page._id}})"
                )
          //.column__page-creator(@click="createPage({chapterID: chapter._id})")
          .column__page-creator
            nuxt-link.btn(to="/admin/PageCreator") Создать страницу
        .table__chapter-creator
          .creator(v-if="isCreateChapter")
            input.creator__field(placeholder="Название раздела" v-model="chapterTitle")
            .creator__enter.el-icon-circle-check(@click="createChapter({technologyID: getCurrentTechnology._id, title: chapterTitle})")
          button.btn(@click="isCreateChapter = true" v-if="!isCreateChapter") Создать раздел
    .table__navigation
      .box
        i(
          @click="next"
          class="el-icon-arrow-right"
          :class="{'active': !isEnd}"
          )
</template>

<script>
  export default {
    mounted() {
      this.technology = this.$store.getters['content/getCurrentTechnology']
    },
    data() {
      return {
        chapterTitle: '',
        isCreateChapter: false,
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
      async createChapter(payload) {
        if (payload.title) {
          await this.$store.dispatch('content/createChapter', {technologyID: payload.technologyID, title: payload.title});
          this.isCreateChapter = false;
        }
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
      endPosition() {
        return - (this.getCurrentTechnology.chapters.length - this.countChaptersDisplayed + 1)
      },
      getCoefficientAdaptive() {
        return this.$store.getters['adaptive/getCoefficientAdaptive'];
      },
      getCurrentTechnology() {
        return this.$store.getters['content/getCurrentTechnology'];
      },
      getCurrentTechnologyID() {
        return this.$store.getters['content/getCurrentTechnology']._id;
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
      },
      endPosition: function (newValue) {
        if (this.position < newValue && newValue <= 0) {
          this.position = newValue;
        }
      },
      getCurrentTechnologyID: function() {
        this.position = 0;
        this.tweenedPosition = 0;
        this.isCreateChapter = false;
        this.chapterTitle = '';
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
      min-width: 25px;
      .box {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      i {
        position: fixed;
        padding: 2em 0;
        align-self: center;
        color: #a2a2a2;
        font-size: 16px;
        font-weight: 700;
        min-width: 25px;
        text-align: center;
      }
      .active {
        cursor: pointer;
        color: #050619;
        border-radius: 1em;
        transition: .35s;
        &:hover {
          background-color: #e2e2e2;
        }
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
          padding: 5px;
          border-bottom: 1px solid #cacaca;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
          margin: 0 1em;
          .actions {
            min-width: max-content;
            i {
              cursor: pointer;
              font-weight: 500;
              padding: 5px;
              &:hover {
                color: blue;
              }
            }
          }
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
        }

        &__page-creator {
          font-size: 14px;
          display: flex;
          justify-content: center;
          padding: 1em;
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
      .creator {
        display: flex;
        justify-content: center;
        font-size: 16px;

        &__field {
          padding: 5px;
          border-bottom: 1px solid blue;
          &:focus {
            border-bottom: 2px solid blue;
          }
        }
        &__enter {
          transition: .35s;
          cursor: pointer;
          margin-left: .5em;
          font-size: 28px;
          color: #00ca12;
          &:hover {
            color: #5bf45a;
          }
        }
      }
    }
  }

  .btn {
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

  @media (min-width: 480px) and (max-width: 991px) {
    .table {
      &__content {
        .column {
          min-width: 50%;
        }
      }
      &__chapter-creator {
        min-width: 50%;
      }
    }
  }

  @media (max-width: 479px) {
    .table {
      &__content {
        .column {
          min-width: 100%;
          &__title, &__page {
            flex-direction: column;
            background-color: #f2f2f2;
            border-radius: .5em;
            margin: 0 .5em .5em;
            span {
              text-align: center;
              margin-bottom: .5em;
              padding-right: 0;
            }
            .actions {
              margin: 0 .5em;
              border-radius: 1em;
              border: 1px solid #cecece;
              i {
                padding: 3px;
                width: 50%;
                text-align: center;

              }
            }
          }
        }
      }
      &__chapter-creator {
        min-width: 100%;
        justify-content: center;
      }
    }
  }

</style>
