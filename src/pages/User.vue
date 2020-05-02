<template>
  <div>
    <div class="row q-pa-md">
      <q-input
        class="col"
        label="Nome"
        v-model="user.name"
      />
    </div>
    <div class="row q-pa-md">
      <q-input
        class="col"
        label="E-mail"
        type="email"
        v-model="user.email"
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
        @click="save"
      />
    </div>
  </div>
</template>
<script>
import authService from '../service/auth-service'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('user')

export default {
  async created() {
    const userId = authService.getId()

    await this.getUser(userId)
  },

  data() {
    return {
      password: '',
      repeatPassword: '',
      showPassword: true,
      showRepeatPassword: true
    }
  },

  methods: {
    ...mapActions(['getUser', 'editUser']),

    async save () {
      if (this.password !== '') {
        if (this.password === this.repeatPassword) {
          this.user.password = this.password
        } else {
          this.$q.notify({
            message: 'As senhas precisam ser iguais!',
            color: 'red',
            position: 'top'
          })
          return
        }
      }

      await this.editUser().then(() => {
        this.$q.notify({
          message: 'Perfil editado com sucesso!',
          color: 'green',
          position: 'top'
        })

        this.$router.push({ name: 'home' })

        if (this.password === '') {
          this.repeatPassword = ''
        }
      })
    }
  },

  computed: {
    ...mapGetters(['user'])
  }
}
</script>
