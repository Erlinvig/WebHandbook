<template lang="pug">
  .confirmation-wrapper
    .confirmation-wrapper__message
      span {{payload.message}}
    .confirmation-wrapper__actions
      button(@click="ok") Ок
      button(@click="close") Отмена
</template>

<script>
  export default {
    props: ['payload'],
    methods: {
      close() {
        this.$store.dispatch('dialog/close')
      },
      ok() {
        this.$store.dispatch(this.payload.actionOK, this.payload.actionOKPayload);
        this.close();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .confirmation-wrapper {
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
        cursor: pointer;
        border: 1px solid #afafaf;
        padding: 1em;
        border-radius: .5em;
        transition: .35s;
        background-color: #f8f8f8;

        &:first-child {
          margin-right: 1em;
        }

        &:hover {
          background-color: #e8e8e8;
        }
      }
     }
  }
</style>
