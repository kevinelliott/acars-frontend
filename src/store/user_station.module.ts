// import UserStationService from '@/services/user_station.service';

export default {
  namespaced: true,
  actions: {
    save({ commit }: { commit: any }, station: any) {
    },
  },
  mutations: {
    loginSuccess(state: any, result: any) {
      state.status.loggedIn = true;
      state.user = result.user;
      state.accessToken = result.accessToken;
    },
    loginFailure(state: any) {
      state.status.loggedIn = false;
      state.user = null;
      state.accessToken = null;
    },
    logout(state: any) {
      state.status.loggedIn = false;
      state.user = null;
      state.accessToken = null;
    },
    registerSuccess(state: any) {
      state.status.loggedIn = false;
    },
    registerFailure(state: any) {
      state.status.loggedIn = false;
    },
  },
};
