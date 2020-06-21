<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          icon="arrow_back"
          flat
          @click="$router.back()"
          dense
          v-if="$route.fullPath !== '/'"
        />
        <q-toolbar-title>
          CheckSyst
        </q-toolbar-title>

        <q-btn-dropdown flat dropdown-icon="more_vert">
          <div class="row">
            <q-btn
              class="col"
              icon="home"
              label="Home"
              color="secondary"
              to="/"
              flat
            />
          </div>
          <div class="row q-mt-sm">
            <q-btn
              class="col"
              icon="person"
              label="Perfil"
              color="primary"
              to="/user"
              flat
            />
          </div>
          <div class="row q-mt-sm">
            <q-btn
              class="col"
              label="Sair"
              icon="input"
              color="red"
              flat
              @click="logout"
            />
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import authService from '../service/auth-service'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
    }
  },
  methods: {
    logout () {
      authService.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
