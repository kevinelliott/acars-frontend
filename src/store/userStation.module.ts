import UserStationService from '@/services/user_station.service';

export default {
  actions: {
    claim({ commit }: { commit: any }, station: any) {

    },
    userStationSave({ commit, rootState }: { commit: any, rootState: any }, station: any) {
      return UserStationService.save(station).then(
        (response: any) => {
          console.log(response.data);
          let { stations } = rootState.auth.user;
          stations = stations.map(
            (s: any) => (station.id === s.id ? station : s),
          );
          commit('auth/updateUserStations', stations);
          return Promise.resolve(response.data);
        },
        (error: any) => {
          commit('saveFailure');
          return Promise.reject(error);
        },
      );
    },
  },
  mutations: {
    saveSuccess(state: any, { rootState, savedStation }: { rootState: any, savedStation: any }) {
      // console.log(rootState.auth);
      // let { stations } = rootState.auth.user;
      // stations = stations.map(
      //   (station: any) => (station.id === savedStation.id ? savedStation : station),
      // );
      // rootState.auth.user.stations = stations;
    },
    saveFailure(state: any) {
      // nothing yet
    },
  },
};
