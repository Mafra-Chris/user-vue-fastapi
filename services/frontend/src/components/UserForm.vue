<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { updateUser } from '../services/userAPI';
import { useVuelidate } from '@vuelidate/core';
import { required, email, maxLength } from '@vuelidate/validators';
import { isCPF, isPIS } from '../helpers/docsBr';
import { getAddress } from '../services/cepAPI';
import { validateStyle, delayTouch } from '../helpers/validation';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
const props = defineProps<{ formType: 'register' | 'update' }>();
const store = useStore();
const router = useRouter();
const userForm = ref({
  name: '',
  email: '',
  cpf: '',
  pis: '',
  zipcode: '',
  street: '',
  home_number: '',
  address_complement: '',
  city: '',
  state: '',
  country: '',
  password: '',
});
const rules = computed(() => ({
  name: { required },
  email: { required, email },
  cpf: { required, isCPF },
  pis: { required, isPIS },
  zipcode: { required },
  street: { required },
  home_number: { required },
  address_complement: { required },
  city: { required },
  state: { required, maxLength: maxLength(2) },
  country: { required },
  password: { required: props.formType == 'register' },
}));

const v$ = useVuelidate(rules, userForm);
const touchMap = new WeakMap();

async function submitUser() {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) {
    return;
  }

  if (props.formType == 'register') {
    try {
      await store.dispatch('register', userForm.value);
    } catch (error: any) {
      $toast.open({
        message: error.message,
        type: 'error',
        position: 'top-right',
        duration: 5000,
      });
    }

    router.push({ path: '/' });
  } else if (props.formType == 'update') {
    try {
      await updateUser(userForm.value, store.getters.stateUser.id);
    } catch (error: any) {
      $toast.open({
        message: error.message,
        type: 'error',
        position: 'top-right',
        duration: 5000,
      });
    }
    try {
      await store.dispatch('viewMe');
    } catch (error: any) {
      $toast.open({
        message: error.message,
        type: 'error',
        position: 'top-right',
        duration: 5000,
      });
    }
  }
}
async function deleteUser() {
  await store.dispatch('deleteUser', store.getters.stateUser.id);
  router.push({ path: '/' });
}

async function setAddress() {
  try {
    let data = await getAddress(userForm.value.zipcode);
    userForm.value.city = data.city || '';
    userForm.value.street = data.street || '';
    userForm.value.state = data.state || '';
    userForm.value.city = data.city || '';
    userForm.value.country = 'Brasil';
  } catch (error) {
    console.log(error);
  }
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
            class="block rounded outline-none px-3 py-1"
            v-model.trim="userForm.name"
            @input="delayTouch(v$.name, touchMap)"
            :class="validateStyle(v$.name.$invalid, v$.name.$dirty)"
          />
          <div v-if="v$.name.$invalid && v$.name.$dirty" class="text-red-500">
            <small>Campo obrigatório</small>
          </div>
        </div>

        <div>
          <label for="email">Email</label>
          <input
            type="text"
            name="email"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model.trim="userForm.email"
            @input="delayTouch(v$.email, touchMap)"
            :class="validateStyle(v$.email.$invalid, v$.email.$dirty)"
          />
          <div v-if="v$.email.$invalid && v$.email.$dirty" class="text-red-500">
            <small>Insira um email válido</small>
          </div>
        </div>
        <div>
          <label for="cpf">CPF</label>
          <input
            type="text"
            name="cpf"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model.trim="userForm.cpf"
            @input="delayTouch(v$.cpf, touchMap)"
            :class="validateStyle(v$.cpf.$invalid, v$.cpf.$dirty)"
          />
          <div v-if="v$.cpf.$invalid && v$.cpf.$dirty" class="text-red-500">
            <small>Insira um CPF válido</small>
          </div>
        </div>
        <div>
          <label for="pis">PIS</label>
          <input
            type="text"
            name="pis"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model.trim="userForm.pis"
            @input="delayTouch(v$.pis, touchMap)"
            :class="validateStyle(v$.pis.$invalid, v$.pis.$dirty)"
          />
          <div v-if="v$.pis.$invalid && v$.pis.$dirty" class="text-red-500">
            <small>Insira um PIS válido</small>
          </div>
        </div>
        <div>
          <label for="cep">CEP</label>
          <input
            type="text"
            name="cep"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model.trim="userForm.zipcode"
            @input="delayTouch(v$.zipcode, touchMap)"
            :class="validateStyle(v$.zipcode.$invalid, v$.zipcode.$dirty)"
            @blur="setAddress"
          />
          <div
            v-if="v$.zipcode.$invalid && v$.zipcode.$dirty"
            class="text-red-500"
          >
            <small>Campo obrigatório</small>
          </div>
        </div>
        <div>
          <label for="street">Rua</label>
          <input
            type="text"
            name="street"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model.trim="userForm.street"
            @input="delayTouch(v$.street, touchMap)"
            :class="validateStyle(v$.street.$invalid, v$.street.$dirty)"
          />
          <div
            v-if="v$.street.$invalid && v$.street.$dirty"
            class="text-red-500"
          >
            <small>Campo obrigatório</small>
          </div>
        </div>
        <div>
          <label for="home_number">Número</label>
          <input
            type="text"
            name="home_number"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model.trim="userForm.home_number"
            @input="delayTouch(v$.home_number, touchMap)"
            :class="
              validateStyle(v$.home_number.$invalid, v$.home_number.$dirty)
            "
          />
          <div
            v-if="v$.home_number.$invalid && v$.home_number.$dirty"
            class="text-red-500"
          >
            <small>Campo obrigatório</small>
          </div>
        </div>
        <div>
          <label for="address_complement">Complemento</label>
          <input
            type="text"
            name="address_complement"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model.trim="userForm.address_complement"
            @input="delayTouch(v$.address_complement, touchMap)"
            :class="
              validateStyle(
                v$.address_complement.$invalid,
                v$.address_complement.$dirty
              )
            "
          />
          <div
            v-if="
              v$.address_complement.$invalid && v$.address_complement.$dirty
            "
            class="text-red-500"
          >
            <small>Campo obrigatório</small>
          </div>
        </div>
        <div>
          <label for="city">Município</label>
          <input
            type="text"
            name="city"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model.trim="userForm.city"
            @input="delayTouch(v$.city, touchMap)"
            :class="validateStyle(v$.city.$invalid, v$.city.$dirty)"
          />
          <div v-if="v$.city.$invalid && v$.city.$dirty" class="text-red-500">
            <small>Campo obrigatório</small>
          </div>
        </div>
        <div>
          <label for="state">Estado</label>
          <input
            type="text"
            name="state"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model.trim="userForm.state"
            @input="delayTouch(v$.state, touchMap)"
            :class="validateStyle(v$.state.$invalid, v$.state.$dirty)"
          />
          <div v-if="v$.state.$invalid && v$.state.$dirty" class="text-red-500">
            <small>Insira um Estado válido</small>
          </div>
        </div>
        <div>
          <label for="country">País</label>
          <input
            type="text"
            name="country"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model.trim="userForm.country"
            @input="delayTouch(v$.country, touchMap)"
            :class="validateStyle(v$.country.$invalid, v$.country.$dirty)"
          />
          <div
            v-if="v$.country.$invalid && v$.country.$dirty"
            class="text-red-500"
          >
            <small>Campo obrigatório</small>
          </div>
        </div>
        <div>
          <label for="password">Senha</label>
          <input
            type="password"
            name="password"
            class="block border border-gray-500 rounded outline-none px-3 py-1"
            v-model.trim="userForm.password"
            @input="delayTouch(v$.password, touchMap)"
            :class="validateStyle(v$.password.$invalid, v$.password.$dirty)"
          />
          <div
            v-if="v$.password.$invalid && v$.password.$dirty"
            class="text-red-500"
          >
            <small>Campo obrigatório</small>
          </div>
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
