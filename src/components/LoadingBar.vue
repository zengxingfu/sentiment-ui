<template>
  <div v-show="isLoading" class="mdl-card mdl-shadow--2dp loading-container">
    <div id="loading" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
    <span>请求中，请稍后……</span>
  </div>
</template>
<script>
export default {
  props: {
    isLoading: Boolean
  }
};
</script>

<style scoped>
.loading-container {
  /* width: 100%; */
  width: 320px;
  height: 64px;
  min-height: 0;
  padding: 16px 24px 8px 24px;
  font-size: 1rem;
  text-align: center;
  margin: 0 auto;
  margin-top: calc(38.2vh - 132px) !important;
}
.loading-container #loading {
  width: 100%;
  margin-bottom: 0.75rem;
}
</style>

