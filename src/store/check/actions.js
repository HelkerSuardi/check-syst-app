import API from '../api'

const loadChecks = async ({ commit }) => {
  await API.get('/checks').then(({ items }) => {
    commit('setChecks', items)
  }).catch(e => {
    console.log('Houve um erro ao buscar as checagens')
  })
}

const loadCheck = async ({ commit }, checkId) => {
  await API.get(`/checks/${checkId}`).then(data => {
    commit('setCheck', data)
  }).catch(e => {
    console.log('Houve um erro ao buscar esta checagem')
  })
}

const loadSpecificChecks = async ({ commit }, userId) => {
  await API.get(`/checks/specific-check/${userId}`).then(data => {
    commit('setChecks', data)
  }).catch(e => {
    console.log('Houve um erro ao buscar esta checagem')
  })
}

const loadVehicles = async ({ commit }) => {
  await API.get('/vehicles').then(({ items }) => {
    commit('setVehicles', items)
  }).catch(e => {
    console.log('Houve um erro ao buscar os veículos')
  })
}

const loadFirefighters = async ({ commit }) => {
  await API.get('/firefighters').then(({ items }) => {
    commit('setFirefighters', items)
  }).catch(e => {
    console.log('Houve um erro ao buscar os usuários')
  })
}

const loadItemsEquips = async ({ commit }) => {
  await API.get('/item-equips').then(({ items }) => {
    commit('setItemsEquips', items)
  }).catch(e => {
    console.log('Houve um erro ao buscar os equipamentos')
  })
}

export {
  loadChecks,
  loadCheck,
  loadVehicles,
  loadFirefighters,
  loadItemsEquips,
  loadSpecificChecks
}
