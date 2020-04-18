<template>
  <div>
    <div class="row q-pa-md">
      <q-input
        class="col"
        label="Nome"
      />
    </div>
    <div class="row q-pa-md">
      <q-input
        class="col"
        label="E-mail"
        type="email"
      />
    </div>
    <div class="row q-pa-md">
      <q-input v-model="password" label="Nova Senha" :type="showPassword ? 'password' : 'text'" class="col">
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
    </div>
    <div class="row q-pa-md">
      <q-input v-model="repeatPassword" label="Repita a nova senha" :type="showRepeatPassword ? 'password' : 'text'" class="col">
        <template v-slot:append>
          <q-icon
            :name="showRepeatPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showRepeatPassword = !showRepeatPassword"
          />
        </template>
      </q-input>
    </div>
    <div class="row q-pa-md">
      <q-btn
        class="col"
        label="Salvar alterações"
        color="primary"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: '',
      repeatPassword: '',
      showPassword: true,
      showRepeatPassword: true
    }
  }
}
</script>
