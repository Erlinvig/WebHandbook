<template lang="pug">
  main(v-if="windowWidth")
    .row(v-for="(row, index) in getRows" :key="index")
      nuxt-link.row__item(v-for="(item, index) in row" :key="index" to="/")
        span {{item.title}}
      .row__item.empty(v-if="row.length < countColumn")

</template>

<script>
  export default {
    data() {
      return {
        countColumn: null,
        windowWidth: null,
        elements: [
          {title: 'Статья 1'},
          {title: 'Статья 2'},
          {title: 'Статья 3'},
          {title: 'Статья 4'},
          {title: 'Статья 5'},
          {title: 'Статья 6'},
          {title: 'Статья 7'},
          {title: 'Статья 8'},
          {title: 'Статья 9'},
          {title: 'Статья 10'},
          {title: 'Статья 11'},
        ]
      }
    },
    methods: {
      listToRows(countColumn) {
        let rowsResult = [];
        this.elements.forEach((item, index) => {
          index % countColumn === 0 ?
            rowsResult.push([item]) :
            rowsResult[rowsResult.length - 1].push(item)
        });
        return rowsResult
      },
      getWindowWidth(event) {
        this.windowWidth = document.documentElement.clientWidth;
      }
    },
    computed: {
      getRows() {
        this.countColumn = null;
        if (this.windowWidth >= 992) {
          this.countColumn = 3;
        } else if(this.windowWidth < 992 && this.windowWidth >= 480) {
          this.countColumn = 2
        } else if (this.windowWidth < 480) {
          this.countColumn = 1
        }

        return this.listToRows(this.countColumn);
      }
    },

    mounted() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth();
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
