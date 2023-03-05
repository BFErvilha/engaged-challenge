<template>
  <q-card class="my-card rm-card-character rm-card-shadow">
    <q-card-section>
      <div class="row justify-content-between">
        <div class="col-6">
          <h2 class="rm-card-title">Localização:</h2>
          <p class="info">
            Nome: <br /><span>{{ location.name }}</span>
          </p>

          <p class="info">
            Tipo: <br /><span> {{ location.type }}</span>
          </p>

          <p class="info">
            Dimensão:<br /><span> {{ location.dimension }}</span>
          </p>
        </div>
        <div class="col-6 text-center">
          <img class="portal" src="@/assets/images/rm-portal.png" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    location: { type: Object, required: true },
  },
};
</script>

<style lang="scss" scoped>
.rm-card-character {
  .info {
    font-size: 15px;

    span {
      font-size: 22px;
    }
  }

  .portal {
    width: 100%;
    max-width: 265px;
  }
}
</style>
