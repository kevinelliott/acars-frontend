import AuthService from '@/services/auth.service';

const browserUser = JSON.parse(localStorage.getItem('user') as string);
const accessToken = JSON.parse(localStorage.getItem('accessToken') as string);
const initialState = browserUser
  ? { status: { loggedIn: true }, user: browserUser, accessToken }
  : { status: { loggedIn: false }, user: null, accessToken: null };

export default {
  namespaced: true,
  state: initialState,
  actions: {
    confirm({ commit }: { commit: any }, token: any) {
      return AuthService.confirm(token).then(
        (result) => {
          commit('confirmSuccess', result);
          return Promise.resolve(result);
        },
        (error) => {
          commit('confirmFailure');
          return Promise.reject(error);
        },
      );
    },
    login({ commit }: { commit: any }, user: any) {
      return AuthService.login(user).then(
        (result) => {
          commit('loginSuccess', result);
          return Promise.resolve(result);
        },
        (error) => {
          commit('loginFailure');
          return Promise.reject(error);
        },
      );
    },
    logout({ commit }: { commit: any }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }: { commit: any }, user: any) {
      return AuthService.register(user).then(
        (response) => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        (error) => {
          commit('registerFailure');
          return Promise.reject(error);
        },
      );
    },
  },
  mutations: {
    confirmSuccess(state: any, result: any) {
      state.status.confirmed = true;
    },
    confirmFailure(state: any) {
      state.status.confirmed = false;
    },
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
    updateUserStations(state: any, stations: any) {
      state.user.stations = stations;
    },
  },
};
