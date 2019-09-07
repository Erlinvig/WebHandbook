<template lang="pug">
  .dialog-wrapper(v-if="isOpen")
    .content(:is="payload.type" :payload="payload")
    .bg(@click="close")
</template>

<script>
  import notification from './notification'
  import confirmation from './confirmation'
  export default {
    components: {
      notification,
      confirmation
    },
    methods: {
      close() {
        this.$store.dispatch('dialog/close')
      }
    },
    computed: {
      isOpen() {
        return this.$store.getters['dialog/getStateOpening'];
      },
      payload() {
        return this.$store.getters['dialog/getPayload'];
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bg {
    background: #000;
    opacity: .5;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 210;
  }
  .content {
    background-color: #fff;
    border-radius: 5px;
    padding: 2em;
    box-shadow: 0 0 6px rgba(0,0,0,0.6);
    z-index: 215;
  }
</style>
