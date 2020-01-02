export const initialState = { message: null }

export const actions = {
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  RESET_NOTIFICATION: 'RESET_NOTIFICATION'
}

export const setNotification = message => {
  return async dispatch => {
    dispatch({ type: actions.SET_NOTIFICATION, data: message })
    setTimeout(() => dispatch(resetNotification()), 5000)
  }
}

export const resetNotification = () => {
  return { type: actions.RESET_NOTIFICATION }
}

const reducer = (state = initialState, action) => {
  /* eslint-disable indent */
  switch (action.type) {
    case actions.SET_NOTIFICATION:
      return { ...state, message: action.data }
    case actions.RESET_NOTIFICATION:
      return { ...state, message: null }
    default:
      return state
    /* eslint-enable indent */
  }
}

export default reducer
