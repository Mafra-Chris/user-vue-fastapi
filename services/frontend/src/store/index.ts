import { createStore } from "Vuex";

import users from './modules/users';

export default createStore({
  modules: {
    users,
  }
});
