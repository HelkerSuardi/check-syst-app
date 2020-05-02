import API from '../api'

const getUser = async ({ commit }, userId) => {
  await API.get(`/firefighters/${userId}`).then(user => {
    commit('setUser', user)
  }).catch(e => {
    console.log('Houve um erro ao buscar o usuário')
  })
}

const editUser = async ({ commit, state }) => {
  try {
    await API.put(`/firefighters/${state.user.id}`, state.user)
  } catch (e) {
    throw new Error('Houve uma falha ao editar o usuário, tente novamente mais tarde')
  }
}

export {
  getUser,
  editUser
}
