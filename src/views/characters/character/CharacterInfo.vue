<template>
  <q-card class="my-card rm-card-character rm-card-shadow">
    <q-card-section>
      <div class="row justify-content-between">
        <div class="col-12">
          <h2 class="rm-card-title">Info:</h2>
        </div>
        <div class="col-6">
          <p class="info">
            Nome: <br /><span>{{ character.name }}</span>
          </p>
        </div>
        <div class="col-6">
          <p class="info">
            Status: <br /><span>{{ character.status }}</span>
          </p>
        </div>
        <div class="col-6">
          <p class="info">
            Espécie: <br /><span>{{ character.specie }}</span>
          </p>
        </div>
        <div class="col-6">
          <p class="info">
            Tipo: <br /><span> {{ characterType(character.type) }}</span>
          </p>
        </div>
        <div class="col-6">
          <p class="info">
            Genero: <br /><span>{{ character.gender }}</span>
          </p>
        </div>
        <div class="col-6">
          <p class="info">
            Origem: <br /><span>{{ character.origin }}</span>
          </p>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { verifyType } from '@/utils/utils';
export default {
  props: {
    character: { type: Object, required: true },
  },
  setup() {
    const characterType = (value) => {
      return verifyType(value);
    };
    return {
      characterType,
    };
  },
};
</script>

<style lang="scss" scoped>
.rm-card-character {
  .info {
    font-size: 15px;
    margin-bottom: 18px;

    span {
      font-size: 22px;
    }
  }
}
</style>
