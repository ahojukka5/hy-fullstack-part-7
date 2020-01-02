import usersService from '../services/users'

export const usersReducer = (state = [], action) => {
  /* eslint-disable indent */
  switch (action.type) {
    case 'INITIALIZE_USERS':
      return action.data
    default:
      return state
  }
  /* eslint-enable indent */
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({ type: 'INITIALIZE_USERS', data: users })
  }
}

export default usersReducer
