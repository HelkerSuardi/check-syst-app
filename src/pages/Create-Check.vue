<template>
  <div>
    <q-dialog class="q-mt-lg" v-model="addItemsDialog" persistent >
      <q-card  style="width: 700px; max-width: 80vw;">
        <q-card-section class="q-pt-none">
          <q-select
            label="Itens"
            :options="['a', 'b', 'c']"
          />
          <q-input
            type="number"
            class="q-mt-lg"
            label="Quantidade"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" flat label="Fechar" v-close-popup />
          <q-btn flat label="Adicionar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="row">
      <q-select
        class="col q-pa-md"
        label="Selecionar Veículo"
        :options="['a', 'b', 'c']"
      />
    </div>
    <div class="row q-pa-md">
      <q-btn
        class="col"
        label="Adicionar itens ao veículo"
        icon="add"
        color="primary"
        @click="addItemsDialog = true"
      />
    </div>
    <div class="row">
        <q-list bordered separator class="col">
          <q-item v-for="(item, index) of itemsCheck" :key="index" v-ripple>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption>{{ 'Quantidade: ' + item.quantity }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn-group push>
                <q-btn
                  push
                  icon="edit"
                  text-color="primary"
                />
                <q-btn
                  push
                  icon="delete"
                  text-color="red"
                />
              </q-btn-group>
            </q-item-section>
          </q-item>
        </q-list>
    </div>
    <q-page-sticky position="bottom-right" :offset="fabPos">
      <q-btn
        fab
        icon="save"
        color="primary"
        :disable="draggingFab"
        v-touch-pan.prevent.mouse="moveFab"
      />
    </q-page-sticky>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addItemsDialog: false,
      fabPos: [ 18, 18 ],
      draggingFab: false,
      itemsCheck: [
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'Farois',
          quantity: 4
        },
        {
          name: 'GPS',
          quantity: 2
        }
      ]
    }
  },

  methods: {
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
