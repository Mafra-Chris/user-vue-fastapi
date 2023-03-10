import { User } from '../../interfaces/user';
import { ActionContext } from 'vuex';
import { deleteUser, getUser, logInUser, logOutUser, postUser, updateUser } from '../../services/userAPI';

interface State {
  user: User | null
}
const state: State = {
  user: null
};

const getters = {
  isAuthenticated: (state: State) => !!state.user,
  stateUser: (state: State) => state.user,
};

const actions = {
  async register({ dispatch }: ActionContext<State, State>, form: User) {
    try {
      await postUser(form)
    } catch (error: any) {
      throw new Error(
        error.message
      )
    }


    await dispatch('logIn', { username: form.email, password: form.password });
  },

  async logIn({ dispatch }: ActionContext<State, State>, user: User) {
    try {
      await logInUser(user)
    } catch (error: any) {
      throw new Error(
        error.message
      )
    }

    await dispatch('viewMe');

  },

  async viewMe({ commit }: ActionContext<State, State>) {
    let data
    try {
      data = await getUser()
    } catch (error: any) {
      throw new Error(
        error.message
      )
    }

    commit('setUser', data);
  },

  async deleteUser({ commit }: ActionContext<State, State>, id: number): Promise<any> {
    try {
      await deleteUser(id)
    } catch (error: any) {
      throw new Error(
        error.message
      )
    }

    commit('logout', null)
  },

  async logOut({ commit }: ActionContext<State, State>) {
    try {
      await logOutUser()
    } catch (error: any) {
      throw new Error(
        error.message
      )
    }

    let user = null;
    commit('logout', user);
  }
};

const mutations = {
  setUser(state: State, user: User) {
    state.user = {}
    state.user = user;
  },
  logout(state: State, user: User) {
    state.user = user;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};