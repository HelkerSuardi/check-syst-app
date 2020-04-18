<template>
  <q-page class="flex flex-center">
    <div class="row">
      <q-btn
        class="col-12"
        label="Checagens"
        color="primary"
        to="/checks"
      />
      <q-btn
        class="col-12 q-mt-md"
        label="Criar checagem"
        color="secondary"
        to="/check-add"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
