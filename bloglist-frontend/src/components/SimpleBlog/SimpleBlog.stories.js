import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'

import SimpleBlog from './SimpleBlog'

export const blog = {
  author: 'John Doe',
  title: 'Who is John Doe anyway?',
  likes: 0
}

export const actions = {
  onLike: action('onLike')
}

storiesOf('SimpleBlog', module)
  .addDecorator(story => (
    <Container maxWidth="sm">
      <Paper>{story()}</Paper>
    </Container>
  ))
  .add('default', () => <SimpleBlog blog={blog} {...actions} />)
  .add('liked', () => <SimpleBlog blog={{ ...blog, likes: 1 }} {...actions} />)
