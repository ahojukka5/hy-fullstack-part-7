This is quite complex component to use, but the following example will implement
all functionality.

```jsx
import React, { useState } from 'react'
import { Paper, Container, Typography } from '@material-ui/core'

const blog = {
  author: 'John Doe',
  title: 'Who is John Doe anyway?',
  likes: 3,
  url: 'https://en.wikipedia.org/wiki/John_Doe',
  user: { name: 'Matti Meikäläinen' },
  comments: [
    { id: '1', content: 'Great blog' },
    { id: '2', content: 'Another comment' }
  ]
}

const App = ({ initialBlog }) => {
  const [blog, setBlog] = useState(initialBlog)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const states = { showDeleteDialog, showDeleteButton: true }
  const actions = {
    onClickLike: () => setBlog({ ...blog, likes: blog.likes + 1 }),
    onClickDelete: () => setShowDeleteDialog(true),
    onCloseDeleteDialog: () => setShowDeleteDialog(false),
    onConfirmDeleteBlog: () => {
      alert('Disabled on this demo')
      setShowDeleteDialog(false)
    },
    onAddComment: content => {
      const newComment = { id: (blog.comments.length + 1).toString(), content }
      const newComments = [...blog.comments, newComment]
      setBlog({ ...blog, comments: newComments })
    }
  }
  return (
    <Container maxWidth="sm">
      <Paper>
        <BlogDetail {...blog} {...states} {...actions} />
      </Paper>
    </Container>
  )
}
;<App initialBlog={blog} />
```
