<template lang="pug">
  .standard
    .notification-wrapper__message
      span {{payload.message}}
    .notification-wrapper__actions
      button(@click="ok") Ок
</template>

<script>
  export default {
    props: ['payload'],
    methods: {
      ok() {
        this.$store.dispatch('dialog/close');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notification-wrapper {
    &__message {
      span {
        font-size: 18px;
      }
      padding-bottom: 1.5em;
    }
    &__actions {
      display: flex;
      justify-content: flex-end;

      button {
        min-width: 10em;
        cursor: pointer;
        border: 1px solid #afafaf;
        padding: 1em;
        border-radius: .5em;
        transition: .35s;
        background-color: #f8f8f8;

        &:hover {
          background-color: #e8e8e8;
        }
      }
    }
  }

  @media (min-width: 320px) and (max-width: 479px) {
    .notification-wrapper {
      &__actions {
        button {
          width: 100%;
        }
      }
    }
  }
</style>
