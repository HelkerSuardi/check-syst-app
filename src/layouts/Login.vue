<template>
  <q-layout view="lHh Lpr lFf" class="img-background" >
    <div class="row justify-center q-mb-xl">
      <h4 class="column items-center">CheckSyst</h4>
    </div>
    <div class="row justify-between">
      <q-img
        class="col-4 q-ml-md"
        src="statics/img/bombgp.png"
        style="height: 30%; width: 30%"
      />
      <q-img
        class="col-4 q-mr-md"
        src="statics/img/bombpr.png"
        style="height: 30%; width: 30%"
      />
    </div>
    <div class="row q-pa-md q-mt-xl">
      <q-input
        class="col"
        v-model="email"
        label="E-mail"
        type="email"
        color="white"
      />
    </div>
    <div class="row q-pa-md">
       <q-input color="white" v-model="password" label="Senha" :type="showPassword ? 'password' : 'text'" class="col">
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
      <q-btn
        color="primary"
        class="full-width"
        label="Entrar"
        @click="login"
        :loading="loading"
        :disable="loading"
      />
    </div>
    <div class="column items-center q-mt-lg">
      <q-chip
        clickable
        @click="resetPassword"
        color="teal"
        text-color="white"
        icon="vpn_key"
      >
        Esqueceu a senha ? Clique aqui!
      </q-chip>
    </div>
  </q-layout>
</template>
<script>
import authService from '../service/auth-service'

export default {
  data() {
    return {
      email: 'admin@admin.com',
      password: '123',
      showPassword: true,
      loading: false
    }
  },

  methods: {
    login () {
      this.loading = true
      this.$axios.post('/auth/authenticate', { email: this.email, password: this.password }).then(response => {
        const { token, data } = response.data
        authService.login({
          token,
          name: data.name,
          id: data._id,
          role: data.role
        })
        this.$router.push({
          name: 'home'
        })
        this.$q.notify({
          message: 'Login efetuado com sucesso!',
          position: 'top',
          color: 'green-13'
        })
        this.loading = false
      }).catch(({ response }) => {
        this.loading = false
        const { message } = response.data
        this.$q.notify({
          message,
          position: 'top',
          color: 'negative'
        })
      })
    },

    resetPassword () {
     this.$q.dialog({
        dark: true,
        title: 'Resetar senha',
        message: 'Digite o seu e-mail',
        prompt: {
          model: '',
          type: 'text'
        },
        cancel: true
      }).onOk(async data => {
          await this.$axios.put(`/firefighters/reset-password/${data}`).then(data => {
            this.$q.notify({
              message: data.data.message,
              position: 'top',
              color: 'green-13'
            })
          }).catch(e => {
            this.$q.notify({
              message: e.response.data.message,
              position: 'top',
              color: 'red'
            })
          })

      })
    }
  }
}
</script>
<style>
  .img-background {
    background: url(../statics/img/bgorange.jpg);
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
