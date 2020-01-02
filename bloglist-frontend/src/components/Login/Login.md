```jsx
import React, { useState } from 'react'
import { Container, Paper, Typography } from '@material-ui/core'
import Login from './Login'

const App = () => {
  const [message, setMessage] = useState('use test/test as login')
  const [showError, setShowError] = useState(false)

  function onLogin(username, password) {
    if (username === password) {
      setShowError(false)
      setMessage('Login succesful!')
    } else {
      setShowError(true)
      setMessage('Login failed.')
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper>
        <Typography component="h2" variant="h5" align="center">
          {message}
        </Typography>
        <Login onLogin={onLogin} showError={showError} />
      </Paper>
    </Container>
  )
}

;<App />
```
