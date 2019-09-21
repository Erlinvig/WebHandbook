<template lang="pug">
  header
    .line
    .title(@click="openChapter")
      i.el-icon-caret-right(:class="rotateClass")
      h1() {{chapter.title}}
    .line
</template>

<script>
  export default {
    props: ['chapter'],
    methods: {
      openChapter() {
        this.isOpen
          ? this.$store.dispatch('content/closeChapter', {id: this.chapter._id})
          : this.$store.dispatch('content/openChapter', {id: this.chapter._id});
      }
    },
    computed: {
      rotateClass() {
        return this.isOpen ? 'rotateOpen' : 'rotateClose'
      },
      isOpen() {
        return this.chapter.isOpen
      }
    }
  }
</script>

<style lang="scss" scoped>
  header {
    margin: .5em 0;
    display: flex;
    align-items: center;
    .el-icon-caret-right {
      transition: all 0.5s;
    }
    .rotateClose {
      transform: rotate(0deg);
    }
    .rotateOpen {
      transform: rotate(90deg);
    }
    .title {
      cursor: pointer;
      display: flex;
      align-items: center;
      min-width: max-content;
      i {
        margin-right: .3em;
      }
      i, h1 {
        font-size: 22px;
      }

      &:hover {
        color: #381a57;
      }
    }
    .line {
      height: 3px;
      background-color: #000;
      &:first-child {
        min-width: 15%;
        margin-right: 1em;
      }
      &:last-child {
        width: 100%;
        margin-left: 1em;
      }
    }
  }

  @media (min-width: 480px) and (max-width: 767px) {
    header {
      .line {
        &:first-child {
          width: 50%;
        }
        &:last-child {
          width: 50%;
        }
      }
      .title {
        i, h1 {
          font-size: 20px;
        }
      }
    }
  }

  @media (min-width: 320px) and (max-width: 479px) {
    header {
      .line {

        &:first-child {
          min-width: 0;
          width: 50%;
        }
        &:last-child {
          width: 50%;
        }
      }
      .title {
        justify-content: center;
        /*min-width: 100%;*/
        i, h1 {
          font-size: 18px;
        }
      }
    }
  }

  @media (max-width: 319px) {
    header {
      .line {
        display: none;
      }
      .title {
        justify-content: center;
        min-width: 100%;
        i, h1 {
          font-size: 18px;
        }
      }
    }
  }
</style>
