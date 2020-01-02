import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import SimpleBlog from './SimpleBlog'

export const App = () => {
  const [blog, setBlog] = React.useState({
    author: 'John Doe',
    title: 'Who is John Doe anyway?',
    likes: 0
  })

  const onLike = () => {
    setBlog({ ...blog, likes: blog.likes + 1 })
  }
  return (
    <Container maxWidth="sm">
      <Paper>
        <SimpleBlog blog={blog} onLike={onLike} />
      </Paper>
    </Container>
  )
}

afterEach(cleanup)

describe('<SimpleBlog />', () => {
  let component
  beforeEach(() => {
    component = render(<App />)
  })
  test('renders content', () => {
    expect(component.container).toHaveTextContent('John Doe')
  })
  test('increases likes by 2, when "like" button is pressed two times', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('2 likes')
  })
})
