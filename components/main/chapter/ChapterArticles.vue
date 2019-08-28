<template lang="pug">
  main
    .row(v-for="(row, index) in getRows" :key="index")
      nuxt-link.row__item(v-for="(item, index) in row" :key="index" to="/")
        span {{item.title}}
      .row__item.empty(v-if="row.length < countColumn")

</template>

<script>
  export default {
    props: ['chapter'],
    mounted() {
      this.pages = this.chapter.pages
    },
    data() {
      return {
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
  main {
    .row {
      display: flex;
      justify-content: space-between;
      &__item {
        display: flex;
        border-radius: 5px;
        background-color: #fff;
        width: 30%;
        text-align: center;
        justify-content: center;
        align-items: center;
        padding: .8em;
        margin: .5em 0;
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
