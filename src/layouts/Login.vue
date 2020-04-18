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
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: '',
      showPassword: true
    }
  }
}
</script>
<style lang="stylus" scoped>
  .fullBody {

  }
</style>
