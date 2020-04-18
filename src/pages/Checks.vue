<template>
  <div>
    <q-list bordered separator>
      <q-item v-for="check of checks" clickable v-ripple @click="doCheck">
        <q-item-section>{{ check.date }}</q-item-section>
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
</template>
<script>
export default {
  data() {
    return {
      checks: [
        {
          date: '11/04/20',
          done: false
        },
        {
          date: '11/04/20',
          done: false
        },
        {
          date: '11/04/20',
          done: false
        }
      ]
    }
  },

  methods: {
    doCheck() {
      this.$router.push('/check')
    }
  }
}
</script>
