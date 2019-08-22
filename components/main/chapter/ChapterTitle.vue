<template lang="pug">
  header
    .line
    .title
      i.el-icon-caret-right
      h1 Асинхронность в JavaScript
    .line
</template>

<style lang="scss" scoped>
  header {
    margin: 1em 0;
    display: flex;
    align-items: center;
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
        width: 30%;
        margin-right: 1em;
      }
      &:last-child {
        width: 100%;
        margin-left: 1em;
      }
    }
  }

  @media (min-width: 1280px) {

  }

  @media (min-width: 992px) and (max-width: 1279px) {

  }

  @media (min-width: 768px) and (max-width: 991px) {

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
        display: none;
      }
      .title {
        min-width: 100%;
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
        min-width: 100%;
        i, h1 {
          font-size: 18px;
        }
      }
    }
  }
</style>
