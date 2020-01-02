```jsx
import React, { useState } from 'react'
import { Paper, Container, Typography } from '@material-ui/core'
import { data } from './UserDetail.stories'
const [message, setMessage] = React.useState('Click some row of the table.')
function onClickTableRow(blog) {
  setMessage(`You clicked table row ${blog.author}`)
}
;<Container maxWidth="sm">
  <Paper>
    <Typography align="center" component="h2" variant="h6">
      {message}
    </Typography>
    <UserDetail user={data.user} onClickTableRow={onClickTableRow} />
  </Paper>
</Container>
```
