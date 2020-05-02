<template>
  <q-page class="flex flex-center">
    <div class="row full-width q-pa-md">
      <q-btn
        class="col-12 full-width"
        label="Checagens"
        color="primary"
        to="/checks"
      />
      <q-btn
        class="col-12 q-mt-md full-width"
        label="Criar checagem"
        v-if="!isOperator()"
        color="secondary"
        to="/check-add"
      />
    </div>
  </q-page>
</template>

<script>
import authService from '../service/auth-service'
export default {
  methods: {
    isOperator () {
      if (authService.getRole() === 'operator') {
        return true
      }
      return false
    }
  }
}
</script>
