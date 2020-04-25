<template >
  <div
    class="fullBody"
    style="background-image: url('statics/img/bgorange.jpg'); width: 100%; height: 100vh; background-position: center;background-repeat: no-repeat;background-size: cover;"
  >
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
      />
    </div>
  </div>
</template>
<script>
import authService from '../service/auth-service'

export default {
  data() {
    return {
      email: 'admin@admin.com',
      password: '123',
      showPassword: true
    }
  },

  methods: {
    login () {
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
      }).catch(({ response }) => {
        const { message } = response.data
        this.$q.notify({
          message,
          position: 'top',
          color: 'negative'
        })
      })
    }
  }
}
</script>
