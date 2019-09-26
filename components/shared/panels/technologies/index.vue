<template lang="pug">
  .wrapper
    ul.technologies(:class="{'container': payload.location === 'main'}")
      li.technologies__left(@click="previous")
        i(class="el-icon-arrow-left" :class="{'technologies__left--active': !isStart}")
      li.technologies__main
        ul.technologies__list(:style="{transform: `translateX(${animatedPosition}%)`}")
          li.technologies__item(
            v-for="(technology, index) in getTechnologyList"
            :key="index"
            :class="{'technologies__item--active': isActive(technology._id)}"
            @click="[setActiveTechnologyID(technology._id), setNewCurrentTechnology(technology._id)]"
          )
            span {{technology.title}}
            i.el-icon-setting(
              v-if="payload.location === 'admin'"
              @click.stop="openSettingTechnology({_id: technology._id, title: technology.title})"
            )
          li.technologies__item.creator(
            v-if="payload.location === 'admin'"
            @click="prepareCreateTechnology"
          )
            i.el-icon-plus.creator__prepare(
              v-if="newTechnologyState === newTechnologyStateOption.default"
              )
            .creator__filling(v-if="newTechnologyState === newTechnologyStateOption.filling")
              i.el-icon-close.creator__filling__close(
                @click="closeCreateTechnology"
              )
              input.creator__filling__field(placeholder="Название" v-model="newTechnologyTitle")
              i.el-icon-circle-check.creator__filling__add(
                @click="createTechnology({title: newTechnologyTitle})"
              )
            i.el-icon-loading.creator__filling__loading(
              v-if="newTechnologyState === newTechnologyStateOption.loading"
            )
      li.technologies__right(@click="next")
        i(class="el-icon-arrow-right" :class="{'technologies__right--active': !isEnd}")
</template>

<script>
  import {TweenLite} from "gsap";

  export default {
    props: ['payload'],
    async mounted() {
      this.technologies = await this.payload.technologies;
    },
    data() {
      return {
        newTechnologyTitle: '',
        newTechnologyState: 'default',
        newTechnologyStateOption: {
          default: 'default',
          filling: 'filling',
          loading: 'loading'
        },
        coefficientTranslate: 0,
        countTechnologiesDisplayed: 0,
        position: 0,
        tweenedPosition: 0,
        technologies: []
      }
    },
    methods: {
      openSettingTechnology(payload) {
        this.$store.dispatch('dialog/open', {type: 'technology-setting', ...payload});
      },
      prepareCreateTechnology() {
        if (this.newTechnologyState === this.newTechnologyStateOption.default) {
          this.newTechnologyState = this.newTechnologyStateOption.filling;
        }
      },
      closeCreateTechnology() {
        setTimeout(() => {
          this.newTechnologyState = this.newTechnologyStateOption.default;
          this.newTechnologyTitle = '';
        }, 0)

      },
      async createTechnology(payload) {
        if (payload.title) {
          this.newTechnologyState = this.newTechnologyStateOption.loading;
          await this.$store.dispatch('content/createTechnology', {title: payload.title});
          this.newTechnologyState = this.newTechnologyStateOption.default;
          this.newTechnologyTitle = '';
        }
      },
      setActiveTechnologyID(id) {
        this.$store.dispatch('content/setActiveTechnologyId', {activeTechnologyID: id});
        this.$router.push({query: {technologyID: id}})
      },
      async setNewCurrentTechnology(id) {
        await this.$store.dispatch('content/setTechnologyById', {id})
      },
      isActive(id) {
        return this.getActiveTechnologyId === id
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
      getTechnologyList() {
        return this.payload.technologies;
      },
      getActiveTechnologyId() {
        return this.$store.getters['content/getActiveTechnologyId']
      },
      isStart() {
        return this.position >= 0
      },
      isEnd() {
        let plus = this.payload.location === 'admin' ? 1 : 0;
        return this.position <= -(this.getTechnologyList.length - this.countTechnologiesDisplayed + plus)
      },
      endPosition() {
        let plus = this.payload.location === 'admin' ? 1 : 0;
        return - (this.getTechnologyList.length - this.countTechnologiesDisplayed + plus)
      },
      animatedPosition() {
        return this.tweenedPosition * this.getCoefficientTranslate;
      },
      getCoefficientAdaptive() {
        return this.$store.getters['adaptive/getCoefficientAdaptive'];
      },
      getCoefficientTranslate() {
        if (this.getCoefficientAdaptive === 6) {
          this.coefficientTranslate = 25;
          this.countTechnologiesDisplayed = 4;
        } else if(this.getCoefficientAdaptive === 5) {
          this.coefficientTranslate = 33.5;
          this.countTechnologiesDisplayed = 3;
        } else if(this.getCoefficientAdaptive === 4 || this.getCoefficientAdaptive === 3) {
          this.coefficientTranslate = 50;
          this.countTechnologiesDisplayed = 2;
        } else if (this.getCoefficientAdaptive === 2 || this.getCoefficientAdaptive === 1) {
          this.coefficientTranslate = 100;
          this.countTechnologiesDisplayed = 1;
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
      font-size: 22px;
      border-radius: 5px;
      margin: 0 1%;
      span, i {
        font-size: 22px;
        font-weight: 700;
        align-self: center;
      }
    }
    .creator {
      &__prepare {
        transition: .35s;
        &:hover {
          color: blue;
        }
      }
      &__filling {
        &__loading {
          color: blue;
        }
        width: 90%;
        display: flex;
        justify-content: space-between;
        span, i {
          font-size: 22px;
          font-weight: 700;
          align-self: center;
        }
        &__field {
          font-size: 20px;
          width: 75%;
          text-align: center;
        }
        &__close {
          transition: .35s;
          color: #7f0000;
          &:hover {
            color: red;
          }
        }
        &__add {
          transition: .35s;
          color: green;
          &:hover {
            color: #00e500;
          }
        }
      }

    }
    &__left--active, &__right--active {
      color: #050619;
    }

    &__item {
      color: #050619;
      min-width: 23%;
      display: flex;
      justify-content: center;
      i {
        margin-left: .5em;
        transition: .35s;
        &:hover {
          color: #7c99db;
        }
      }
    }

    &__item--active {
      background-color: #fffca8;
    }

    &__left, &__right {
      color: #c8c8c8;
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
    .technologies__item {
      min-width: 31.4%;
    }
  }


  @media (min-width: 480px) and (max-width: 991px) {
    .technologies {
      margin-top: 1em;
      margin-bottom: 1em;
    }
    .technologies__item {
      min-width: 48%;
    }
  }

  @media (min-width: 320px) and (max-width: 479px) {
    .technologies {
      margin-top: 1em;
      margin-bottom: 1em;
    }
    .technologies__item {
      min-width: 90%;
      margin: 0 5%;
      span, i {
        font-size: 17px;
        padding: 3px 0;
      }
      .creator__filling {
        input, i {
          font-size: 16px;
          margin: 0;
        }
      }
    }
  }

  @media (max-width: 319px) {
    .technologies {
      margin-top: 1em;
      margin-bottom: 1em;
    }
    .technologies__item {
      min-width: 90%;
      margin: 0 5%;
    }
  }
</style>
