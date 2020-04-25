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
            v-model="preJustify"
          />
          <q-input
            type="textarea"
            v-model="preNote"
            class="q-mt-lg"
            label="Justificativa"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Salvar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-list bordered separator>
      <q-item v-for="(item, index) of itemsCheck" :key="index" clickable v-ripple>
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption>{{ item.quantity }}</q-item-label>
        </q-item-section>
        <q-checkbox
          left-label
          label="N/Ok"
          color="red"
          :value="item.ok"
          :true-value="false"
          :false-value="true"
          @input="setNotOk(index)"
        />
        <q-checkbox
          class="q-ml-md"
          color="green"
          left-label
          label="Ok"
          :value="item.ok"
          @input="item.ok = true"
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
export default {
  data () {
    return {
      notOkDialog: false,
      preJustify: '',
      preNote: '',
      fabPos: [ 18, 18 ],
      draggingFab: false,
      itemsCheck: [
        {
          name: 'Lanterna',
          quantity: 2,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustiveeeeeeeeeeeeeeeeeeeeeeeel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Combustivel',
          quantity: 12000,
          justify: '',
          note: '',
          ok: null
        },
        {
          name: 'Pneu',
          quantity: 4,
          justify: '',
          note: '',
          ok: null
        }
      ],
      justifyOptions: [
        {
          label: 'Quebrado',
          value: 'broked'
        },
        {
          label: 'Não encontrado',
          value: 'not_found'
        }
      ]
    }
  },

  methods: {
    setNotOk(itemIndex) {
      this.itemsCheck[itemIndex].ok = false
      this.notOkDialog = true
    },

    saveCheck() {
      this.$router.push('/checks')
      this.$q.notify({
        message: 'Salvo com sucesso!',
        color: 'green',
        position: 'top'
      })
    },

    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    }
  }
}
</script>
