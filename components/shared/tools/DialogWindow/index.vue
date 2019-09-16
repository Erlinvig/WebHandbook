<template lang="pug">
  .dialog-wrapper(v-if="isOpen")
    transition(name="fade")
      .content(:is="payload.type" :payload="payload"  v-if="isShow")
    .bg(@click="close")
</template>

<script>
  import notification from './notification'
  import confirmation from './confirmation'
  import TechnologySetting from './TechnologySetting'
  export default {
    components: {
      notification,
      confirmation,
      TechnologySetting
    },
    data() {
      return {

      }
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
      isShow() {
        return this.$store.getters['dialog/getStateShow'];
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
    margin: 2em;
    background-color: #fff;
    border-radius: 5px;
    padding: 2em;
    box-shadow: 0 0 6px rgba(0,0,0,0.6);
    z-index: 215;
  }

  .fade-enter-active {
    animation: fade .35s;
  }
  .fade-leave-active {
    animation: fade .35s reverse;
  }

  @keyframes fade {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
</style>
