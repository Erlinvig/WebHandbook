<template lang="pug">
  .loader
</template>

<style lang="scss" scoped>
  .loader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #050084;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin .65s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
