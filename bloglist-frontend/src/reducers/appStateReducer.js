export function setAppReady() {
  return async dispatch => {
    dispatch({ type: 'UPDATE_APP_STATE', data: { appReady: true } })
  }
}

export function showLoginForm() {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_APP_STATE',
      data: { loginDialogVisibility: true }
    })
  }
}

export function hideLoginForm() {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_APP_STATE',
      data: { loginDialogVisibility: false }
    })
  }
}

export function loginFormState(state) {
  return state.loginDialogVisibility
}

const initialState = {
  appReady: false,
  loginDialogVisibility: false
}

const reducer = (state = initialState, action) => {
  return action.type === 'UPDATE_APP_STATE'
    ? { ...state, ...action.data }
    : state
}

export default reducer
