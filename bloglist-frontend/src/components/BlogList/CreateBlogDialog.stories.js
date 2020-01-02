import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Container, Paper } from '@material-ui/core'
import CreateBlogDialog from './CreateBlogDialog'

const state = {
  author: 'John Doe',
  title: 'Who is John Doe anyway?',
  url: 'https://en.wikipedia.org/wiki/John_Doe'
}

export const actions = {
  onChangeAuthor: action('onChangeAuthor'),
  onChangeTitle: action('onChangeTitle'),
  onChangeUrl: action('onChangeUrl'),
  onOpen: action('onOpen'),
  onClose: action('onClose'),
  onSubmit: action('onSubmit'),
  onCancel: action('onCancel')
}

const App = () => {
  const [state, setState] = useState({
    open: false,
    author: '',
    title: '',
    url: ''
  })

  const actions = {
    onChangeAuthor: author => {
      action('onChangeAuthor')(author)
      setState({ ...state, author })
    },
    onChangeTitle: title => {
      action('onChangeTitle')(title)
      setState({ ...state, title })
    },
    onChangeUrl: url => {
      action('onChangeUrl')(url)
      setState({ ...state, url })
    },
    onOpen: () => {
      action('onOpen')()
      setState({ ...state, open: true })
    },
    onClose: () => {
      action('onClose')()
      setState({ ...state, open: false })
    },
    onSubmit: ({ author, title, url }) => {
      action('onSubmit')(author, title, url)
      setState({ ...state, open: false })
    },
    onCancel: () => {
      action('onCancel')()
      setState({ ...state, open: false })
    }
  }

  return <CreateBlogDialog {...state} {...actions} />
}

const Layout = story => (
  <Container maxWidth="sm">
    <Paper>{story()}</Paper>
  </Container>
)

storiesOf('CreateBlogDialog', module)
  .addDecorator(Layout)
  .add('default', () => <CreateBlogDialog />)
  .add('open', () => <CreateBlogDialog open={true} {...state} {...actions} />)
  .add('closed', () => <CreateBlogDialog open={false} {...actions} />)
  .add('with external state manager', () => <App />)
