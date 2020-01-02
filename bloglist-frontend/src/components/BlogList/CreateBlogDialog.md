```jsx
import React, { useState } from 'react'
import { Paper, Container, Typography } from '@material-ui/core'

const App = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('Click button to open dialog.')
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  const onCancel = () => setOpen(false)
  const onSubmit = ({ author, title, url }) => {
    setMessage(`Created new blog: ${author}, ${title}, ${url}`)
    setOpen(false)
  }
  return (
    <Container maxWidth="sm">
      <Paper>
        <Typography align="center" component="h2" variant="h6">
          {message}
        </Typography>
        <CreateBlogDialog
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </Paper>
    </Container>
  )
}
;<App />
```
