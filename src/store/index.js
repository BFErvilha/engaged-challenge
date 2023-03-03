import { createStore } from 'vuex';

export default createStore({
  state: {
    graphqlUrl: 'https://rickandmortyapi.com/graphql',
  },
  getters: {
    graphqlUrl: (state) => state.graphqlUrl,
  },
  mutations: {},
  actions: {},
  modules: {},
});
