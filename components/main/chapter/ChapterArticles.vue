<template lang="pug">
  .wrapper(:style="{height: `${animatedHeight}px`}")
    main(:style="[{height: `${animatedHeight}px`}, {transform: `scale(${animatedScale})`}]")
      .angles
        .angle-top-left
        .angle-top-right
      .row(v-for="(row, index) in getRows" :key="index")
        nuxt-link.row__item(
          v-for="(item, index) in row" 
          :key="index" 
          :to="`page/${item._id}`"
          :class="{'row__item--marked': item.isMarked}"
          )
          span {{item.title}}
        .row__item.empty(v-if="row.length < countColumn")
      p.no-content(v-if="getRows.length === 0") Пусто
      .angles
        .angle-bottom-left
        .angle-bottom-right
</template>

<script>
  export default {
    props: ['chapter'],
    data() {
      return {
        height: 0,
        tweenedHeight: 0,
        tweenedScale: 0,
        show: false,
        countColumn: null,
      }
    },
    methods: {
      listToRows(countColumn) {
        let rowsResult = [];
        this.pages.forEach((item, index) => {
          index % countColumn === 0 ?
            rowsResult.push([item]) :
            rowsResult[rowsResult.length - 1].push(item)
        });
        return rowsResult
      }
    },
    computed: {
      pages() {
        return this.chapter.pages;
      },
      getCoefficientAdaptive() {
        return this.$store.getters['adaptive/getCoefficientAdaptive'];
      },
      getRows() {
        if (this.getCoefficientAdaptive) {
          this.countColumn = null;
          if (this.getCoefficientAdaptive === 6 || this.getCoefficientAdaptive === 5) {
            this.countColumn = 3;
          } else if(this.getCoefficientAdaptive === 4 || this.getCoefficientAdaptive === 3) {
            this.countColumn = 2
          } else if (this.getCoefficientAdaptive === 2 || this.getCoefficientAdaptive === 1) {
            this.countColumn = 1
          }

          return this.listToRows(this.countColumn);
        }
      },
      animatedHeight() {
        if (this.getRows.length > 0) {
          return (this.tweenedHeight * (14 + (this.getRows.length) * (40 + 14) + 1)).toFixed(0);
        } else {
          return (this.tweenedHeight * 75).toFixed(0);
        }
      },
      animatedScale() {
        return this.tweenedScale;
      },
      isOpen() {
        return this.chapter.isOpen
      }
    },
    watch: {
      isOpen: function(newValue) {
        if(this.chapter.isOpen) {
          TweenLite.to(this.$data, 0.15, { tweenedHeight: +newValue });
        }
        else if(!this.chapter.isOpen) {
          TweenLite.to(this.$data, 0.35, { tweenedScale: +newValue });
        }
      },
      tweenedHeight: function (newValue) {
        if(this.tweenedHeight === 1) {
          TweenLite.to(this.$data, 0.35, { tweenedScale: +newValue });
        }
      },
      tweenedScale: function(newValue) {
        if(this.tweenedScale < 0.5 && !this.chapter.isOpen) {
          TweenLite.to(this.$data, 0.15, { tweenedHeight: +newValue });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  main {
    padding: 1em;

    .angles {
      display: flex;
      justify-content: space-between;
      height: 0;
    }
    .angle-top-left,
    .angle-top-right,
    .angle-bottom-left,
    .angle-bottom-right {
      width: 1.5em;
      height: 1.5em;
    }
    .angle-top-left {
      transform: translate(-1em, -1em);
      border-top: 3px solid #260d43;
      border-left: 3px solid #260d43;
    }
    .angle-bottom-left {
      transform: translate(-1em, -0.5em);
      border-bottom: 3px solid #260d43;
      border-left: 3px solid #260d43;
    }
    .angle-top-right {
      transform: translate(1em, -1em);
      border-top: 3px solid #260d43;
      border-right: 3px solid #260d43;
    }
    .angle-bottom-right {
      transform: translate(1em, -0.5em);
      border-bottom: 3px solid #260d43;
      border-right: 3px solid #260d43;
    }

    .row {
      display: flex;
      justify-content: space-between;
      margin: 14px 0;
      &:nth-child(2) {
        margin-top: 0;
      }
      &:nth-last-child(2) {
        margin-bottom: 0;
      }

      &__item {
        max-height: 40px;
        display: flex;
        border-radius: 5px;
        background-color: #fff;
        width: 30%;
        text-align: center;
        justify-content: center;
        align-items: center;
        padding: 12px;
        box-shadow: 0 0 3px rgba(0,0,0,0.2);
        transition: .35s;
        span {
          font-size: 16px;
        }
        &:hover {
          box-shadow: 0 0 8px rgba(0,0,0,0.45);
        }

        &--marked {
          background: #deffdc;
        }
      }
      .empty {
        opacity: 0;
      }
    }
    .no-content {
      background: #dcdcdc;
      text-align: center;
      font-size: 15px;
      padding: 1em;
    }
  }

  @media (min-width: 1280px) {
    .row__item {
      min-width: 30%;
    }
  }

  @media (min-width: 992px) and (max-width: 1279px) {
    .row__item {
      min-width: 30%;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .row__item {
      min-width: 45%;
    }
  }

  @media (min-width: 480px) and (max-width: 767px) {
    .row__item {
      min-width: 45%;
    }
  }

  @media (min-width: 320px) and (max-width: 479px) {
    .row__item {
      min-width: 100%;
    }
  }

  @media (max-width: 319px) {
    .row__item {
      min-width: 100%;
    }
  }
</style>
