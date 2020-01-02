import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Container, Paper } from '@material-ui/core'

import Login from './Login'

export const actions = {
  onLogin: action('onLogin'),
  onChangeUsername: action('onChangeUsername'),
  onChangePassword: action('onChangePassword')
}

export const LoginApp = () => {
  const [state, setState] = useState({
    username: 'test',
    password: 'test',
    showErrorMessage: false
  })

  const actions = {
    onChangeUsername: username => {
      action('onChangeUsername')(username)
      setState({ ...state, username })
    },
    onChangePassword: password => {
      action('onChangePassword')(password)
      setState({ ...state, password })
    },
    onLogin: (username, password) => {
      action('onLogin')(username, password)
      setState({ ...state, showErrorMessage: username !== password })
    }
  }

  return <Login {...state} {...actions} />
}

const states = { username: 'test', password: 'secret', showErrorMessage: true }

const Layout = story => (
  <Container maxWidth="sm">
    <Paper>{story()}</Paper>
  </Container>
)

storiesOf('Login', module)
  .addDecorator(Layout)
  .add('default screen', () => <Login />)
  .add('with content', () => <Login {...states} {...actions} />)
  .add('with external state manager', () => <LoginApp />)
