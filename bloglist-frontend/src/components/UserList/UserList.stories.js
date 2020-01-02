import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Container, Paper } from '@material-ui/core'

import UserList from './UserList'

export const users = [
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

export const data = { users }

export const actions = {
  onClickTableRow: action('onClickTableRow')
}

storiesOf('UserList', module)
  .addDecorator(story => (
    <Container maxWidth="sm">
      <Paper>{story()}</Paper>
    </Container>
  ))
  .add('default', () => <UserList {...data} {...actions} />)
