<template lang="pug">
  .wrapper
    p(@click="show = !show") Нажми меня
    p {{chapter.isOpen}}
    transition(name="fade")
      main(v-if="show")
        .angles
          .angle-top-left
          .angle-top-right
        .row(v-for="(row, index) in getRows" :key="index")
          nuxt-link.row__item(v-for="(item, index) in row" :key="index" to="/")
            span {{item.title}}
          .row__item.empty(v-if="row.length < countColumn")
        .angles
          .angle-bottom-left
          .angle-bottom-right
</template>

<script>
  export default {
    props: {chapter: Object},
    mounted() {
      this.pages = this.chapter.pages;
    },
    data() {
      return {
        ch: null,
        show: false,
        countColumn: null,
        pages: []
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .angles {
    display: flex;
    justify-content: space-between;
    height: 0;
  }
  .angle-top-left,
  .angle-top-right,
  .angle-bottom-left,
  .angle-bottom-right {
    width: 30px;
    height: 30px;
  }
  .angle-top-left {
    transform: translate(-1em, -1em);
    border-top: 3px solid #260d43;
    border-left: 3px solid #260d43;
  }
  .angle-bottom-left {
    transform: translate(-1em, -1em);
    border-bottom: 3px solid #260d43;
    border-left: 3px solid #260d43;
  }
  .angle-top-right {
    transform: translate(1em, -1em);
    border-top: 3px solid #260d43;
    border-right: 3px solid #260d43;
  }
  .angle-bottom-right {
    transform: translate(1em, -1em);
    border-bottom: 3px solid #260d43;
    border-right: 3px solid #260d43;
  }

  main {
    padding: 1em;

    .row {
      display: flex;
      justify-content: space-between;
      margin: 1em 0;
      &:nth-child(2) {
        margin-top: 0;
      }
      &:nth-last-child(2) {
        margin-bottom: 0;
      }

      &__item {
        display: flex;
        border-radius: 5px;
        background-color: #fff;
        width: 30%;
        text-align: center;
        justify-content: center;
        align-items: center;
        padding: .8em;
        box-shadow: 0 0 3px rgba(0,0,0,0.2);
        transition: .35s;
        span {
          font-size: 16px;
        }

        &:hover {
          box-shadow: 0 0 8px rgba(0,0,0,0.45);
        }
      }
      .empty {
        opacity: 0;
      }
    }
  }

  .fade-enter-active {
    animation: fade .5s;
  }
  .fade-leave-active {
    animation: fade .5s reverse;
  }
  @keyframes fade {
    0% {
      max-height: 0;
      transform: scale(0);
      padding: 0;
    }
    100% {
      max-height: 300px;
      transform: scale(1);
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
