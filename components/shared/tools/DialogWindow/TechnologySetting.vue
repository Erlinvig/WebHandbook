<template lang="pug">
  .confirmation-wrapper
    .confirmation-wrapper__title.mb2
      span Настройка > {{payload.title}}
    .confirmation-wrapper__settings.settings.mb2
      .settings__loading(v-if="stateDialog === stateDialogOption.loading")
        i.el-icon-loading
      .settings__newTitle(v-if="stateDialog === stateDialogOption.default")
        input(placeholder="Новое название" v-model="newTitle")
    .confirmation-wrapper__actions
      button(@click="removeTechnology") Удалить
      button(@click="close") Отмена
      button(@click="ok") Ок
</template>

<script>
  export default {
    props: ['payload'],
    data() {
      return {
        stateDialog: 'default',
        newTitle: '',
        stateDialogOption: {
          default: 'default',
          loading: 'loading'
        }
      }
    },
    methods: {
      async removeTechnology() {
        if (this.stateDialog === this.stateDialogOption.default) {
          this.stateDialog = this.stateDialogOption.loading;
          await this.$store.dispatch('content/removeTechnology', {_id: this.payload._id});
          this.$store.dispatch('dialog/close');
        }
      },
      close() {
        this.$store.dispatch('dialog/close')
      },
      async ok() {
        if (this.stateDialog === this.stateDialogOption.default) {
          this.stateDialog = this.stateDialogOption.loading;
          await this.$store.dispatch('content/changeTechnologyTitle', {_id: this.payload._id, title: this.newTitle});
          this.close();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .confirmation-wrapper {
    .settings {
      &__loading {
        display: flex;
        justify-content: center;
        i {
          font-size: 25px;
          color: blue;
        }
      }
      &__newTitle {
        input {
          width: 100%;
          font-size: 18px;
          padding: .5em;
          border: 1px solid gainsboro;
        }
      }
    }
    &__title {
      span {
        font-size: 18px;
      }
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
        margin-right: 1em;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          background-color: #e8e8e8;
        }
      }
    }
  }
</style>
