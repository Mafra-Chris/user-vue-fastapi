<script setup lang="ts">
import { useStore } from 'Vuex';
import { useRouter } from 'vue-router';
import { User } from '../interfaces/user';
import { updateUser } from '../services/userAPI';
const props = defineProps<{ formType: 'register' | 'update' }>();
const store = useStore();
const router = useRouter();
const userForm = ref<User>({});
async function submitUser() {
  if (props.formType == 'register') {
    console.log(userForm.value);
    await store.dispatch('register', userForm.value);
    router.push({ path: '/' });
  } else if (props.formType == 'update') {
    await updateUser(userForm.value, store.getters.stateUser.id);
    await store.dispatch('viewMe');
  }
}
async function deleteUser() {
  await store.dispatch('deleteUser', store.getters.stateUser.id);
  router.push({ path: '/' });
}
onMounted(() => {
  if (props.formType == 'update' && store.getters.stateUser != null) {
    userForm.value = store.getters.stateUser;
  }
});
</script>

<template>
  <div class="">
    <div>
      <form @submit.prevent="submitUser">
        <div>
          <label for="username">Nome</label>
          <input
            type="text"
            name="username"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.name"
          />
        </div>
        <div>
          <label for="username">Email</label>
          <input
            type="text"
            name="username"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.email"
          />
        </div>
        <div>
          <label for="username">CPF</label>
          <input
            type="text"
            name="username"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.cpf"
          />
        </div>
        <div>
          <label for="username">PIS</label>
          <input
            type="text"
            name="username"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.pis"
          />
        </div>
        <div>
          <label for="username">CEP</label>
          <input
            type="text"
            name="username"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.zipcode"
          />
        </div>
        <div>
          <label for="username">Rua</label>
          <input
            type="text"
            name="username"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.street"
          />
        </div>
        <div>
          <label for="username">Número</label>
          <input
            type="text"
            name="username"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.home_number"
          />
        </div>
        <div>
          <label for="username">Complemento</label>
          <input
            type="text"
            name="username"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.address_complement"
          />
        </div>
        <div>
          <label for="username">Município</label>
          <input
            type="text"
            name="username"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.city"
          />
        </div>
        <div>
          <label for="username">Estado</label>
          <input
            type="text"
            name="username"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.state"
          />
        </div>
        <div>
          <label for="username">País</label>
          <input
            type="text"
            name="username"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.country"
          />
        </div>
        <div>
          <label for="password">Senha</label>
          <input
            type="password"
            name="password"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model="userForm.password"
          />
        </div>
        <button
          class="rounded-lg px-3 text-center py-1 border border-red-500 block text-red-500"
          v-if="formType == 'update'"
          @click="deleteUser"
        >
          Apagar conta
        </button>
        <button
          class="rounded-lg px-3 text-center py-1 bg-purple-600 text-white"
          type="submit"
        >
          Confirmar
        </button>
      </form>

      <span class="block" v-if="formType == 'register'">
        Já possui uma conta?
        <span class="text-purple-600"
          ><router-link to="/">Login</router-link>
        </span>
      </span>
    </div>
  </div>
</template>

<style></style>
