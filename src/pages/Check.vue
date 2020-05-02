<template>
  <div>
    <q-dialog class="q-mt-lg" v-model="notOkDialog" persistent >
      <q-card  style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Justificativa</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-select
            label="Motivos"
            map-options
            :options="justifyOptions"
            v-model="check.itemsEquips[indexOfItemToJustify].motive"
          />
          <q-input
            type="textarea"
            v-model="check.itemsEquips[indexOfItemToJustify].justify"
            class="q-mt-lg"
            label="Justificativa"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup @click="cancelNoOkJustifying" />
          <q-btn flat label="Salvar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-list bordered separator>
      <q-item v-for="(item, index) of check.itemsEquips" :key="index" clickable v-ripple>
        <q-item-section>
          <q-item-label>{{ item.item.name }}</q-item-label>
          <q-item-label caption>{{ item.quantity }}</q-item-label>
        </q-item-section>
        <q-checkbox
          left-label
          label="N/Ok"
          color="red"
          :value="item.status"
          :true-value="false"
          :false-value="true"
          @input="setNotOk(index)"
        />
        <q-checkbox
          class="q-ml-md"
          color="green"
          left-label
          label="Ok"
          :value="item.status"
          @input="item.status = true"
        />
      </q-item>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="fabPos">
      <q-btn
        fab
        icon="save"
        color="primary"
        :disable="draggingFab"
        v-touch-pan.prevent.mouse="moveFab"
        @click="saveCheck"
      />
    </q-page-sticky>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('check')

export default {
  data () {
    return {
      notOkDialog: false,
      preJustify: '',
      preNote: '',
      indexOfItemToJustify: 0,
      fabPos: [ 18, 18 ],
      draggingFab: false,
      justifyOptions: ['Quebrado', 'Não encontrado', 'Outro...']
    }
  },

  async created() {
    await this.loadCheck(this.$route.params.id)
  },

  methods: {
    ...mapActions(['loadCheck']),

    setNotOk(itemIndex) {
      this.indexOfItemToJustify = itemIndex
      this.check.itemsEquips[itemIndex].status = false
      this.notOkDialog = true
    },

    cancelNoOkJustifying () {
      this.check.itemsEquips[this.indexOfItemToJustify].motive = ''
      this.check.itemsEquips[this.indexOfItemToJustify].justify = ''
      this.check.itemsEquips[this.indexOfItemToJustify].status = null
    },

    async saveCheck() {
      await this.$axios.put(`/checks/${this.check.id}`, this.check).then(() => {
        this.$q.notify({
          message: 'Salvo com sucesso!',
          color: 'green',
          position: 'top'
        })
        this.$router.push('/checks')
      }).catch(e => {
        this.$q.notify({
          message: 'Houve uma falha ao tentar salvar esta checagem!',
          color: 'red',
          position: 'top'
        })
      })

    },

    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    }
  },

  computed: {
    ...mapGetters(['check'])
  }
}
</script>
