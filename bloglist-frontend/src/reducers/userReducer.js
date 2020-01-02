import blogService from '../services/blogs'
import loginService from '../services/login'

// Actions

export const actions = {
  SET_USER: 'SET_USER',
  SHOW_LOGIN_FAILURE_ERROR: 'SHOW_LOGIN_FAILURE_ERROR',
  HIDE_LOGIN_FAILURE_ERROR: 'HIDE_LOGIN_FAILURE_ERROR'
}

// Action creators

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      await blogService.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      dispatch({ type: actions.SET_USER, data: user })
      dispatch({ type: actions.HIDE_LOGIN_FAILURE_ERROR })
    } catch (error) {
      dispatch({ type: actions.SET_USER, data: null })
      dispatch({ type: actions.SHOW_LOGIN_FAILURE_ERROR })
    }
  }
}

export const logout = () => {
  localStorage.removeItem('loggedBloglistUser')
  return { type: actions.SET_USER, data: null }
}

export const setUser = user => {
  return async dispatch => {
    await blogService.setToken(user.token)
    dispatch({ type: actions.SET_USER, data: user })
  }
}

export const showLoginFailureError = () => ({
  type: actions.SHOW_LOGIN_FAILURE_ERROR
})
export const hideLoginFailureError = () => ({
  type: actions.HIDE_LOGIN_FAILURE_ERROR
})

export const initialState = { user: null, showError: false }

const reducer = (state = initialState, action) => {
  /* eslint-disable indent */
  switch (action.type) {
    case actions.SET_USER:
      return { ...state, user: action.data }
    case actions.SHOW_LOGIN_FAILURE_ERROR:
      return { ...state, showError: true }
    case actions.HIDE_LOGIN_FAILURE_ERROR:
      return { ...state, showError: false }
    default:
      return state
  }
  /* eslint-enable indent */
}

export default reducer
