import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// We add all registered actions to here, just to make sure that unregisted
// actions throws some sort or warning and does not pass silently. This is just
// one extra layer to make sure we don't make bugs.
const actions = [
  'blogs.initialize()',
  'blogs.new()',
  'blogs.update()',
  'blogs.delete()',
  'login.login()',
  'login.logout()',
  'users.initialize()',
  'notification.setMessage()',
  'notification.closeMessage()'
]

const reducers = {
  blogs: (state = [], action) => {
    switch (action.type) {
      case 'blogs.initialize()':
        return action.data.blogs
      case 'blogs.new()':
        return [...state, action.data]
      case 'blogs.delete()':
        return state.filter(b => b.id !== action.data.id)
      case 'blogs.update()':
        return state.map(b => (b.id !== action.data.id ? b : action.data))
      default:
        return state
    }
  },
  users: (state = [], action) => {
    switch (action.type) {
      case 'users.initialize()':
        return action.data.users
      default:
        return state
    }
  },
  notification: (state = null, action) => {
    switch (action.type) {
      case 'notification.setMessage()':
        return action.data
      case 'notification.closeMessage()':
        return null
      default:
        return state
    }
  },
  login: (state = {}, action) => {
    switch (action.type) {
      case 'login.login()':
        return action.data
      case 'login.logout()':
        return {}
      default:
        return state
    }
  },
  // ui: { login: (state = {}, actions) => {} }
  debug: (state = null, action) => {
    if (action.type.includes('redux')) {
      return action.data || state
    }
    console.log(`dispatch: type ${action.type}, payload `, action.data)
    if (!actions.includes(action.type)) {
      console.warn(
        `action type ${action.type} not registered to App. To remove this message, add ${action.type} to actions.`
      )
    }
    return action.data || state
  }
}

const store = createStore(combineReducers(reducers), applyMiddleware(thunk))

export default store
