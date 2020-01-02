The component is intentionally designed to be visually stunning.

```jsx
import React from 'react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import SimpleBlog from './SimpleBlog'

const [blog, setBlog] = React.useState({
  author: 'John Doe',
  title: 'Who is John Doe anyway?',
  likes: 0
})

const onLike = () => {
  setBlog({ ...blog, likes: blog.likes + 1 })
}

;<Container maxWidth="sm">
  <Paper>
    <SimpleBlog blog={blog} onLike={onLike} />
  </Paper>
</Container>
```
