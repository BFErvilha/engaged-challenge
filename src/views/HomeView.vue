<template>
  <q-card class="my-card rm-card-character rm-card-shadow home-card">
    <div class="row q-col-gutter-md justify-content-center">
      <div class="col-12 text-center">
        <img alt="Rick and Morty Portal" src="@/assets/images/rm-home.png" />
      </div>
      <div class="col-12 info-text text-center">
        <h1 class="title">Code Challenge Utilizando:</h1>
        <p class="opt">GrapQL para realizar consulta</p>
        <p class="opt">Quasar como UI Components</p>
        <p class="opt">VueX</p>
        <p class="opt">Vue.JS 3 (composition API)</p>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style lang="scss" scoped>
.home-card {
  max-width: 700px;
  width: 100%;
  margin: 10% auto;
  img {
    max-width: 300px;
    width: 100%;
  }

  .info-text {
    color: #f0f2eb;
    h1 {
      font-size: 25px !important;
      line-height: 30px !important;
      margin: 5px auto 15px;
    }
    .opt {
      font-size: 18px;
    }
  }
}
</style>
