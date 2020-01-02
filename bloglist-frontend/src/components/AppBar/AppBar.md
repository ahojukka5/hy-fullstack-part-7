```jsx
import React, { useState, useReducer, useEffect } from 'react'
import { Button, Paper, Container, Typography } from '@material-ui/core'
import AppBar, { reducer, setUser, setValue } from './AppBar'

const initialState = {
  value: 0,
  user: 'Test User',
  tabs: [{ label: 'Blogs', to: '/blogs' }, { label: 'Users', to: '/users' }]
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const onLogout = () => dispatch(setUser(null))
  const onChangeTab = (event, value) => dispatch(setValue(value))
  const onClick = () => dispatch(setUser('Test User'))

  return (
    <Container maxWidth="sm">
      <Paper>
        <Button onClick={onClick}>Press to login</Button>
        <AppBar
          user={state.user}
          tabs={state.tabs}
          value={state.value}
          onChangeTab={onChangeTab}
          onLogout={onLogout}
        />
      </Paper>
    </Container>
  )
}
;<App />
```
