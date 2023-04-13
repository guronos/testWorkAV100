export const state = () => ({
  BASE_URL: "https://api.av100.ru/v3/",
  API_KEY: "8bcfb6e1-4fa8-4fae-872c-a435bbdbe8d9",
  userToken: "",
  userId: "",
  userData: {},
});

export const getters = {
  getUserData(state) {
    return state.userData;
  },
};

export const mutations = {
  setTokenAndId(state, data) {
    state.userToken = data.token;
    state.userId = data.user.id;
  },
  /**
   * Из ответа собираем только нужные данные, чтоб не нагружать localStorage
   */
  saveUserData(state, data) {
    state.userData.companyName = data.companyname;
    state.userData.userName = data.fname;
    state.userData.loginUser = data.login;
    state.userData.phoneNumber = data.phone;
    state.userData.timeZone = data.timezonestring;
    state.userData.colorInLents = data.lentacolortype;
    state.userData.selectNotification = data.notifytypestring;
    state.userData.switchSIP = data.calltype;
    state.userData.autoSkip = data.redirecttarget;
  },
};

export const actions = {
  /**
   * В данном хуке мы не только авторизуемся, но и сибираем данные о пользователе.
   */
  async nuxtServerInit({ commit }) {
    try {
      const afterAuthorization = await this.$axios.$post(
        `${this.state.BASE_URL}login`,
        {
          login: "9614615230",
          password: "1333886511",
          fromuser: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Api-Key": `${this.state.API_KEY}`,
          },
        }
      );
      commit("setTokenAndId", afterAuthorization);
      const userData = await this.$axios.$get(
        `${this.state.BASE_URL}user/${afterAuthorization.user.id}`,
        {
          headers: {
            Accept: "application/json",
            "X-Api-Key": `${this.state.API_KEY}`,
            "X-User-Token": `${afterAuthorization.token}`,
          },
        }
      );
      await commit("saveUserData", userData);
    } catch (e) {
      console.log(e);
    }
  },
  async handlerChangeEmail({ commit }, email) {
    try {
      await this.$axios.$put(
        `${this.state.BASE_URL}user/${this.state.userId}`,
        {
          email,
        },
        {
          headers: {
            Accept: "application/json",
            "X-Api-Key": `${this.state.API_KEY}`,
            "X-User-Token": `${this.state.userToken}`,
          },
        }
      );
      return "Сохранено";
    } catch (e) {
      console.log(e);
    }
  },
};
