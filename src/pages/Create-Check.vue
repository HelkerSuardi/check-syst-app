<template>
  <div>
    <q-dialog class="q-mt-lg" v-model="addItemsDialog" persistent >
      <q-card  style="width: 700px; max-width: 80vw;">
        <q-card-section class="q-pt-none">
          <q-select
            map-options
            label="Itens"
            :options="itemsEquipsOptions"
            v-model="itemEquip"
          />
          <q-input
            type="number"
            class="q-mt-lg"
            label="Quantidade"
            v-model="quantityItemEquip"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn color="primary" flat label="Fechar" v-close-popup />
          <q-btn flat label="Adicionar" v-close-popup @click="addItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="row">
      <q-select
        map-options
        emit-value
        class="col q-pa-md"
        label="Selecionar Responsável"
        :options="firefightersOptions"
        v-model="check.firefighter"
      />
    </div>
    <div class="row">
      <q-select
        map-options
        emit-value
        class="col q-pa-md"
        label="Selecionar Veículo"
        :options="vehiclesOptions"
        v-model="check.vehicle"
        @input="vehicle => loadSavedItemsInVehicle(vehicle)"
      />
    </div>
    <div class="row q-pa-md">
      <q-btn icon="event" color="secondary" class="col" label="Selecionar data">
        <q-popup-proxy ref="checksDate" transition-show="scale" transition-hide="scale">
          <q-date v-model="check.date" minimal @input="() => $refs.checksDate.hide()"/>
        </q-popup-proxy>
      </q-btn>
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
          <q-item class="column items-center">
            <q-item-label header> {{ 'Checagem para o dia: ' + moment(check.date).format('DD/MM/YY') }} </q-item-label>
          </q-item>
          <q-item v-for="(item, index) of check.itemsEquips" :key="index" v-ripple>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption>{{ 'Quantidade: ' + item.quantity }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn-group push>
                <q-btn
                  push
                  icon="delete"
                  text-color="red"
                  @click="removeItem(index)"
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
        @click="save"
      />
    </q-page-sticky>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters } = createNamespacedHelpers('check')

export default {
  data() {
    return {
      addItemsDialog: false,
      fabPos: [ 18, 18 ],
      draggingFab: false,
      check: {
        date: '',
        itemsEquips: []
      },
      itemEquip: '',
      quantityItemEquip: 1
    }
  },

  async created() {
    await this.loadVehicles()
    await this.loadFirefighters()
    await this.loadItemsEquips()
  },

  methods: {
    ...mapActions(['loadVehicles', 'loadFirefighters', 'loadItemsEquips']),

    moveFab (ev) {
      this.draggingFab = ev.isFirst !== true && ev.isFinal !== true

      this.fabPos = [
        this.fabPos[0] - ev.delta.x,
        this.fabPos[1] - ev.delta.y
      ]
    },

    addItem () {
      this.check.itemsEquips.push({
        item: this.itemEquip.value,
        name: this.itemEquip.label,
        quantity: this.quantityItemEquip
      })
      this.itemEquip = ''
      this.quantityItemEquip = 1
    },

    removeItem (index) {
      this.$q.dialog({
        title: 'Excluir item',
        message: 'Deseja realmente excluir esse item ?',
        cancel: true,
      }).onOk(() => {
        this.check.itemsEquips.splice(index, 1)
      })
    },

    async save() {
      try {
        await this.$axios.post('/checks', this.check)
        await this.$axios.put(`/vehicles/${this.check.vehicle}`, { itemsEquips: this.check.itemsEquips })

        this.$q.notify({
          message: 'Checagem criada com sucesso!',
          color: 'green',
          position: 'top'
        })

        this.$router.push({
          name: 'home'
        })
      } catch (e) {
        console.log('Houve um problema na criação da checagem')
      }
    },

    loadSavedItemsInVehicle(selectedVehicle) {
      const vehicle = this.vehicles.find(vehicle => vehicle.id.toString() === selectedVehicle.toString())
      this.check.itemsEquips = vehicle.itemsEquips.map(v => {
        return {
          item: v.item,
          name: v.item.name,
          quantity: v.quantity
        }
      })
    }
  },

  computed: {
    ...mapGetters(['vehicles', 'firefighters', 'itemsEquips']),

    vehiclesOptions () {
      return this.vehicles.map(vehicle => {
        return {
          label: vehicle.name,
          value: vehicle.id
        }
      })
    },

    firefightersOptions () {
      return this.firefighters.map(firefighter => {
        return {
          label: firefighter.name,
          value: firefighter.id
        }
      })
    },

    itemsEquipsOptions () {
      return this.itemsEquips.map(itemEquip => {
        return {
          label: itemEquip.name,
          value: itemEquip.id
        }
      })
    }
  }
}
</script>
