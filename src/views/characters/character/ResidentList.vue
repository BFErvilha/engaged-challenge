<template>
  <div class="row">
    <div
      class="col-sm-6 col-md-3 resident-item"
      v-for="resident in residentList"
      :key="resident.id"
      @click="toResidentPage(resident.id)"
    >
      <q-card class="my-card rm-card-profile rm-residents">
        <q-img :src="resident.image"> </q-img>
      </q-card>
      <p class="resident-name">
        {{ resident.name }}
      </p>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
// import router from '@/router';
export default {
  name: 'ResidentList',
  props: {
    residentList: { type: Object, required: true },
  },
  setup() {
    const store = useStore();
    const toResidentPage = (id) => {
      store.dispatch('changeToNewCharacter', id);
      const currentUrl = new URL(window.location.href);
      currentUrl.pathname = currentUrl.pathname.replace(/\/\d+$/, `/${id}`);
      window.location.href = currentUrl.toString();
    };

    return {
      toResidentPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.resident-item {
  cursor: pointer;
  .rm-residents {
    width: 100px;
    margin: 15px auto;
  }
  .resident-name {
    margin-bottom: 5px;
    text-align: center;
  }
}
</style>
