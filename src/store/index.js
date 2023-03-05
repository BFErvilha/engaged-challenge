import { createStore } from 'vuex';

export default createStore({
  state: {
    graphqlUrl: 'https://rickandmortyapi.com/graphql',
    characterId: 0,
  },
  getters: {
    graphqlUrl: (state) => state.graphqlUrl,
    characterId: (state) => state.characterId,
  },
  mutations: {
    changeCharacter(state, newCharacterId) {
      state.characterId = newCharacterId;
    },
  },
  actions: {
    changeToNewCharacter({ commit }, newCharacterId) {
      commit('changeCharacter', newCharacterId);
    },
  },
  modules: {},
});
