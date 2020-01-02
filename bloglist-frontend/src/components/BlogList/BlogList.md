```jsx
import React, { useState } from 'react'
import { Paper, Container, Typography } from '@material-ui/core'

const blogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const App = () => {
  const [message, setMessage] = useState('Click some row of the table.')

  function onClickTableRow(blog) {
    setMessage(`You clicked blog ${blog.title}`)
  }

  return (
    <Container maxWidth="sm">
      <Paper>
        <Typography align="center" component="h2" variant="h6">
          {message}
        </Typography>
        <BlogList blogs={blogs} onClickTableRow={onClickTableRow} />
      </Paper>
    </Container>
  )
}

;<App />
```
