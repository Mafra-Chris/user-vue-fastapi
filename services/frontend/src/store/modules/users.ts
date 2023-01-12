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
    await postUser(form)
    let UserForm = new FormData();
    if (form.email && form.password) {
      UserForm.append('username', form.email);
      UserForm.append('password', form.password);
    }
    await dispatch('logIn', UserForm);
  },

  async logIn({ dispatch }: ActionContext<State, State>, user: User) {
    await logInUser(user)
    await dispatch('viewMe');
  },

  // async  updateUser({ dispatch }: any, user: User, id: number) {
  //   await updateUser(user, id)
  //   await dispatch('viewMe')

  // },

  async viewMe({ commit }: ActionContext<State, State>) {
    let data = await getUser()
    await commit('setUser', data);
  },

  async deleteUser({ }, id: number): Promise<any> {
    await deleteUser(id)
  },

  async logOut({ commit }: ActionContext<State, State>) {

    await logOutUser()
    let user = null;
    commit('logout', user);
  }
};

const mutations = {
  setUser(state: State, username: string) {
    state.user = {}
    state.user.email = username;
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