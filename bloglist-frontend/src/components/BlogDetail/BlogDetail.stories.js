import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Paper, Container } from '@material-ui/core'
import BlogDetail from './BlogDetail'

const blog = {
  author: 'John Doe',
  title: 'Who is John Doe anyway?',
  likes: 3,
  url: 'https://en.wikipedia.org/wiki/John_Doe',
  addedBy: 'Matti Meikäläinen',
  comments: [
    { id: '1', content: 'Great blog!' },
    { id: '2', content: 'Really?' }
  ]
}

export const data = { ...blog, showDeleteDialog: false }

export const actions = {
  onClickLike: action('onClickLike'),
  onClickDelete: action('onClickDelete'),
  onCloseDeleteDialog: action('onCloseDeleteDialog'),
  onConfirmDeleteBlog: action('onConfirmDeleteBlog'),
  onAddComment: action('onAddComment'),
  onChangeComment: action('onChangeComment')
}

const Layout = story => (
  <Container maxWidth="sm">
    <Paper>{story()}</Paper>
  </Container>
)

storiesOf('BlogDetail', module)
  .addDecorator(Layout)
  .add('default', () => <BlogDetail />)
  .add('with content added by someone else', () => (
    <BlogDetail {...blog} {...actions} showDeleteDialog={false} />
  ))
  .add('with content added by you, and delete button is available', () => (
    <BlogDetail
      {...blog}
      {...actions}
      showDeleteButton={true}
      showDeleteDialog={false}
    />
  ))
  .add(
    'with content added by you, and delete button is available, and you have pressed that button',
    () => <BlogDetail {...data} {...actions} showDeleteDialog={true} />
  )
