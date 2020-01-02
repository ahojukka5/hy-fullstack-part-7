```jsx
import React, { useState } from 'react'
import { Paper, Container, Typography } from '@material-ui/core'

const users = [
  {
    id: '5db6f7ac3826a24ba8a35926',
    name: 'John Doe',
    username: 'john',
    blogs: [
      '5a422a851b54a676234d17f7',
      '5a422aa71b54a676234d17f8',
      '5a422b3a1b54a676234d17f9'
    ]
  },
  {
    id: '5db80f789cd7f77c48a67aa5',
    name: 'Matti Meikäläinen',
    username: 'matti',
    blogs: [
      '5a422b891b54a676234d17fa',
      '5a422ba71b54a676234d17fb',
      '5a422bc61b54a676234d17fc'
    ]
  }
]

const App = ({ users }) => {
  const [message, setMessage] = useState('Click some row of the table!')

  function onClickTableRow(user) {
    setMessage(`You clicked user ${user.name} with ${user.blogs.length} blogs`)
  }

  return (
    <Container maxWidth="sm">
      <Paper>
        <Typography align="center" component="h2" variant="h6">
          {message}
        </Typography>
        <UserList users={users} onClickTableRow={onClickTableRow} />
      </Paper>
    </Container>
  )
}

;<App users={users} />
```

With the help of `onClickTableRow`, one can setup a route to some other page,
when a table row is clicked:

```js static
import { useHistory } from 'react-router-dom'
const RoutedUserList = ({ users }) => {
  let history = useHistory()
  const toUserDetailPage = user => history.push(`/users/${user.id}`)
  return <UserList users={users} onClickTableRow={toUserDetailPage} />
}
```
