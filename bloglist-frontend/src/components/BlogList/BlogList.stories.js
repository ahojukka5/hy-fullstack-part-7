import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Container, Paper } from '@material-ui/core'
import BlogList from './BlogList'

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

export const data = { blogs }

export const actions = {
  onClickTableRow: action('onClickTableRow')
}

storiesOf('BlogList', module)
  .addDecorator(story => (
    <Container maxWidth="sm">
      <Paper>{story()}</Paper>
    </Container>
  ))
  .add('default', () => <BlogList {...data} {...actions} />)
