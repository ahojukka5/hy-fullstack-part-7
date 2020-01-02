import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Paper, Container } from '@material-ui/core'
import UserDetail from './UserDetail'

export const data = {
  user: {
    name: 'John Doe',
    id: '5db6f7ac3826a24ba8a35926',
    blogs: [
      {
        id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 1
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
  }
}

export const actions = {
  onClickTableRow: action('onClickTableRow')
}

storiesOf('UserDetail', module)
  .addDecorator(story => (
    <Container maxWidth="sm">
      <Paper>{story()}</Paper>
    </Container>
  ))
  .add('default', () => <UserDetail {...data} {...actions} />)
