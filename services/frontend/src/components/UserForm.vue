<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { updateUser } from '../services/userAPI';
import { useVuelidate } from '@vuelidate/core';
import { required, email, maxLength, requiredIf } from '@vuelidate/validators';
import { isCPF, isPIS } from '../helpers/validateDocsBr';
import {
  maskCPF,
  maskPIS,
  maskCEP,
  capitalizeFirstLetter,
} from '../helpers/strings';
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
  password: { required: requiredIf(props.formType == 'register') },
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
      $toast.open({
        message: 'Perfil atualizado',
        type: 'success',
        position: 'top-right',
        duration: 5000,
      });
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
  try {
    await store.dispatch('deleteUser', store.getters.stateUser.id);
  } catch (error: any) {
    $toast.open({
      message: error.message,
      type: 'error',
      position: 'top-right',
      duration: 5000,
    });
  }

  router.push({ path: '/' });
}

async function setAddress() {
  try {
    let data = await getAddress(userForm.value.zipcode);
    userForm.value.zipcode = maskCEP(userForm.value.zipcode);
    userForm.value.city = data.city || '';
    userForm.value.street = data.street || '';
    userForm.value.state = data.state || '';
    userForm.value.city = data.city || '';
    userForm.value.country = 'Brasil';
  } catch (error: any) {
    $toast.open({
      message: error.message,
      type: 'error',
      position: 'top-right',
      duration: 5000,
    });
  }
}

onMounted(() => {
  if (props.formType == 'update' && store.getters.stateUser != null) {
    userForm.value = store.getters.stateUser;
  }
});
</script>

<template>
  <div class="w-full">
    <form
      @submit.prevent="submitUser"
      class="p-2 md:w-3/4 lg:w-1/2 xl:w-1/3 m-auto"
    >
      <h1 class="font-semibold text-3xl">Cadastro</h1>
      <section class="my-4">
        <h1 class="font-semibold text-xl">Contato</h1>
        <div class="grid grid-cols-2 gap-2">
          <div class="col-span-2">
            <label class="font-medium" for="username">Nome</label>
            <input
              type="text"
              name="username"
              class="field"
              v-model.trim="userForm.name"
              @input="delayTouch(v$.name, touchMap)"
              @blur="userForm.name = capitalizeFirstLetter(userForm.name)"
              :class="validateStyle(v$.name.$invalid, v$.name.$dirty)"
            />
            <div v-if="v$.name.$invalid && v$.name.$dirty" class="text-red-500">
              <small>Campo obrigatório</small>
            </div>
          </div>

          <div class="col-span-2">
            <label class="font-medium" for="email">Email</label>
            <input
              type="text"
              name="email"
              class="field"
              v-model.trim="userForm.email"
              @input="delayTouch(v$.email, touchMap)"
              :class="validateStyle(v$.email.$invalid, v$.email.$dirty)"
            />
            <div
              v-if="v$.email.$invalid && v$.email.$dirty"
              class="text-red-500"
            >
              <small>Insira um email válido</small>
            </div>
          </div>
          <div>
            <label class="font-medium" for="cpf">CPF</label>
            <input
              type="text"
              name="cpf"
              class="field"
              v-model.trim="userForm.cpf"
              @input="delayTouch(v$.cpf, touchMap)"
              @blur="userForm.cpf = maskCPF(userForm.cpf)"
              :class="validateStyle(v$.cpf.$invalid, v$.cpf.$dirty)"
            />
            <div v-if="v$.cpf.$invalid && v$.cpf.$dirty" class="text-red-500">
              <small>Insira um CPF válido</small>
            </div>
          </div>
          <div>
            <label class="font-medium" for="pis">PIS</label>
            <input
              type="text"
              name="pis"
              class="field"
              v-model.trim="userForm.pis"
              @input="delayTouch(v$.pis, touchMap)"
              @blur="userForm.pis = maskPIS(userForm.pis)"
              :class="validateStyle(v$.pis.$invalid, v$.pis.$dirty)"
            />
            <div v-if="v$.pis.$invalid && v$.pis.$dirty" class="text-red-500">
              <small>Insira um PIS válido</small>
            </div>
          </div>
        </div>
      </section>
      <section class="mb-4">
        <h1 class="font-semibold text-xl">Endereço</h1>
        <div class="grid grid-cols-6 gap-2">
          <div class="col-span-3 md:col-span-2">
            <label class="font-medium" for="cep">CEP</label>
            <input
              type="text"
              name="cep"
              class="field"
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

          <div class="col-span-4 md:col-span-5">
            <label class="font-medium" for="street">Rua</label>
            <input
              type="text"
              name="street"
              class="field"
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
          <div class="col-span-2 md:col-span-1">
            <label class="font-medium" for="home_number">Número</label>
            <input
              type="text"
              name="home_number"
              class="field"
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
          <div class="col-span-6">
            <label class="font-medium" for="address_complement"
              >Complemento</label
            >
            <input
              type="text"
              name="address_complement"
              class="field"
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
          <div class="col-span-4 md:col-span-5">
            <label class="font-medium" for="city">Município</label>
            <input
              type="text"
              name="city"
              class="field"
              v-model.trim="userForm.city"
              @input="delayTouch(v$.city, touchMap)"
              :class="validateStyle(v$.city.$invalid, v$.city.$dirty)"
            />
            <div v-if="v$.city.$invalid && v$.city.$dirty" class="text-red-500">
              <small>Campo obrigatório</small>
            </div>
          </div>
          <div class="col-span-2 md:col-span-1">
            <label class="font-medium" for="state">Estado</label>
            <input
              type="text"
              name="state"
              class="field"
              v-model.trim="userForm.state"
              @input="delayTouch(v$.state, touchMap)"
              :class="validateStyle(v$.state.$invalid, v$.state.$dirty)"
            />
            <div
              v-if="v$.state.$invalid && v$.state.$dirty"
              class="text-red-500"
            >
              <small>Insira um Estado válido</small>
            </div>
          </div>
          <div class="col-span-6">
            <label class="font-medium" for="country">País</label>
            <input
              type="text"
              name="country"
              class="field"
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
        </div>
      </section>
      <h1 class="font-semibold text-xl">Segurança</h1>
      <div>
        <label class="font-medium" for="password">Senha</label>
        <input
          type="password"
          name="password"
          class="field"
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
        class="rounded p-3 text-center font-medium mt-4 border border-red-500 block text-red-500"
        v-if="formType == 'update'"
        @click="deleteUser"
      >
        Apagar conta
      </button>
      <button
        class="rounded text-center p-3 w-full bg-purple-600 text-white my-4 font-medium"
        type="submit"
      >
        Confirmar
      </button>
      <router-link to="/">
        <button
          class="rounded text-center p-3 w-full border border-purple-600 font-medium"
          v-if="formType == 'update'"
        >
          Voltar
        </button>
      </router-link>
      <span class="block" v-if="formType == 'register'">
        Já possui uma conta?
        <span class="text-purple-600"
          ><router-link to="/">Login</router-link>
        </span>
      </span>
    </form>
  </div>
</template>
