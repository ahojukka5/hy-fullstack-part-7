import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Provider } from 'react-redux'
import { Box, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import StoryRouter from 'storybook-react-router'

import { App } from './App'

// A super-simple mock of a redux store
const getStore = state => ({
  getState: () => state,
  subscribe: () => 0,
  dispatch: action_ => {
    if (typeof action_ === 'object') {
      const { type, data } = action_
      action('dispatch')(type, JSON.stringify(data))
    } else if (typeof action_ === 'function') {
      const match = String(action_).match(
        /type: '(?<type>.+)'.+(?<data>[\s\S]+)\s\}\)/m
      )
      if (match) {
        // console.log(match.input)
        // console.log(match.groups)
        action('async dispatch')(match.groups.type, match.groups.data)
      } else {
        console.log('no match for function', String(action_))
        action('function')(String(action_))
      }
    }
  }
})

const useStyles = makeStyles(theme => ({
  headerText: { align: 'justify', margin: theme.spacing() },
  footerText: { align: 'justify', margin: theme.spacing() },
  box: {
    display: 'flex',
    height: 'auto'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  jsonBox: {
    display: 'flex',
    height: 'auto',
    marginLeft: '20px'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  App: {
    marginTop: '15px'
  }
}))

const PrettyPrintJson = ({ data }) => {
  return <pre>state = {JSON.stringify(data, null, 2)}</pre>
}

const Frame = ({ state, message, children }) => {
  const classes = useStyles()
  return (
    <Provider store={getStore(state)}>
      <Grid container>
        <Grid item xs={6}>
          <Box className={classes.box}>
            <Typography className={classes.headerText}>{message}</Typography>
          </Box>
          <Box className={classes.box}>
            <Typography className={classes.footerText}>
              Application state
            </Typography>
          </Box>
          <Box className={classes.jsonBox}>
            <PrettyPrintJson data={state} />
          </Box>
        </Grid>
        <Grid item xs className={classes.App}>
          {children}
        </Grid>
      </Grid>
    </Provider>
  )
}

const AppWithFrame = ({ state, message }) => {
  return (
    <Frame state={state} message={message}>
      <App />
    </Frame>
  )
}

storiesOf('App', module).add('Login screen', () => (
  <AppWithFrame
    state={{}}
    message="First time when App renders it looks likes this. It asks for
      username and password. At this time, the state of the software can be
      empty. That is, there is absolutely nothing in store. Under the
      application, application state is rendered. "
  />
))

storiesOf('App', module).add(
  'Login screen, when incorrect credentials are given',
  () => (
    <AppWithFrame
      state={{
        ui: {
          login: {
            username: 'john',
            password: 'secret',
            showErrorMessage: true
          }
        }
      }}
      message="If wrong username/password combination is given, App will give
      an error about wrong incredentials. Better luck, next time. Unless if
      tried with test/test."
    />
  )
)

storiesOf('App', module)
  .addDecorator(StoryRouter({}, { initialEntries: ['/'] }))
  .add('BlogList view', () => (
    <AppWithFrame
      state={{
        blogs: [
          {
            id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            likes: 7
          },
          {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
          }
        ],
        ui: {
          userLoggedIn: true,
          userName: 'John Doe',
          notificationMessage: 'Login succesful. Welcome back, John Doe!'
        }
      }}
      message="After succesful login, application shows a list of blogs added
      to the system. In nagigation bar, user name is shown with navigation tabs
      to blogs and users. Application is also welcoming user back with a
      notification message. This view is called `BlogList`"
    />
  ))

storiesOf('App', module)
  .addDecorator(StoryRouter({}, { initialEntries: ['/'] }))
  .add('BlogList view, add new blog', () => (
    <AppWithFrame
      state={{
        blogs: [
          {
            id: '5a422a851b54a676234d17f7',
            title: 'React patterns',
            author: 'Michael Chan',
            likes: 7
          },
          {
            id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
          }
        ],
        ui: {
          userLoggedIn: true,
          userName: 'John Doe',
          createBlogDialog: {
            open: true,
            author: 'Joe Shmoe',
            title: 'Who is John Doe anyway?',
            url: 'https://en.wikipedia.org/wiki/John_Doe'
          }
        }
      }}
      message="Clicking (+) button allows to add new blogs to system."
    />
  ))

storiesOf('App', module)
  .addDecorator(
    StoryRouter({}, { initialEntries: ['/blogs/5a422aa71b54a676234d17f9'] })
  )
  .add('BlogDetailView', () => (
    <AppWithFrame
      state={{
        login: {
          username: 'john'
        },
        blogs: [
          {
            id: '5a422aa71b54a676234d17f9',
            title: 'Who is John Doe anyway?',
            author: 'Joe Shmoe',
            url: 'https://en.wikipedia.org/wiki/John_Doe',
            likes: 0,
            user: {
              name: 'John Doe',
              username: 'john'
            }
          }
        ],
        ui: {
          userLoggedIn: true,
          userName: 'John Doe'
        }
      }}
      message="By clicking blog from the blog list or adding new one directs you to the detailed blog view."
    />
  ))
