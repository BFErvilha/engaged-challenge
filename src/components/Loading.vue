<template>
  <div class="loading-container">
    <q-spinner-ball color="green" size="30em" />
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  name: 'Loading',
};
</script>

<style lang="scss">
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh !important;
}
</style>
