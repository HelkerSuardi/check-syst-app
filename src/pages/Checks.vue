<template>
  <div>
    <q-list bordered separator>
      <q-item v-for="(check, index) of checks" :key="index" clickable v-ripple>
        <q-item-section>{{ 'Checagem do dia: ' + moment(check.date).format('DD/MM/YYYY') }}</q-item-section>
        <q-item-section side>
          <q-btn-group push>
            <q-btn
              push
              icon="check_circle_outline"
              text-color="green"
              :to="{ name:'check', params: { id: check._id || check.id } }"
            />
            <q-btn
              push
              icon="delete"
              text-color="red"
              v-if="!isOperator()"
              @click="deleteCheck(check.id)"
            />
          </q-btn-group>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import authService from '../service/auth-service'
const { mapActions, mapGetters } = createNamespacedHelpers('check')

export default {
  data() {
    return {
    }
  },

  async created () {
    if (authService.getRole() === 'operator') {
      await this.loadSpecificChecks(authService.getId())
    } else {
      await this.loadChecks()
    }
  },

  methods: {
    ...mapActions(['loadChecks', 'loadSpecificChecks']),

    deleteCheck(checkId) {
      this.$q.dialog({
        title: 'Excluir item',
        message: 'Deseja realmente excluir esse item ?',
        cancel: true,
      }).onOk(async () => {
        await this.$axios.delete(`/checks/${checkId}`).then(() => {
          this.$q.notify({
            message: 'Checagem excluida com sucesso!',
            position: 'top',
            color: 'green'
          })
          this.loadChecks()
        }).catch(e => {
          this.$q.notify({
            message: 'Falha ao excluir checagem!',
            position: 'top',
            color: 'red'
          })
        })
      })
    },

    isOperator () {
      if (authService.getRole() === 'operator') {
        return true
      }
      return false
    }
  },

  computed: {
    ...mapGetters(['checks'])
  }
}
</script>
