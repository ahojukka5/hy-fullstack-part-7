import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Container,
  CssBaseline,
  Paper,
  CircularProgress
} from '@material-ui/core'
import loginService from './services/login'
import blogService from './services/blogs'
import usersService from './services/users'

import {
  BlogList,
  CreateBlogDialog,
  BlogDetail,
  UserList,
  UserDetail,
  Login,
  Notification,
  AppBar
} from './components'

/* Layout */

export function Layout({ children }) {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login) || {}
  const notification = useSelector(state => state.notification) || {}
  const tabs = [
    { label: 'Blogs', component: Link, to: '/' },
    { label: 'Users', component: Link, to: '/users' }
  ]
  const props = {
    AppBar: {
      userName: login.name,
      tabs: login.token ? tabs : [],
      onLogout: () => {
        localStorage.removeItem('BlogListUser')
        dispatch({ type: 'login.logout()' })
      }
    },
    Notification: {
      message: notification.message,
      onClose: () => dispatch({ type: 'notification.closeMessage()' })
    }
  }

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Paper>
        <AppBar {...props.AppBar} />
        <Notification {...props.Notification} />
        {children}
      </Paper>
    </Container>
  )
}

/* Views */

// function dummyLogin(username, password) {
//   console.warn('login disabled, all usernames and password are good!')
//   return { username: 'test', name: 'test user', token: '123' }
// }

export const LoginView = () => {
  const ui = useSelector(state => state.ui) || {}
  const dispatch = useDispatch()
  const onLogin = (username, password) =>
    dispatch(async dispatch => {
      const user = await loginService.login(username, password)
      // { username, name, token } = user
      const dataString = JSON.stringify(user)
      window.localStorage.setItem('BlogListUser', dataString)
      blogService.setToken(user.token)
      dispatch({ type: 'login.login()', data: { ...user } })
    })
  return <Login {...ui.login} onLogin={onLogin} />
}

export const BlogListView = () => {
  const blogList = useSelector(state => state.blogs) || []
  const ui = useSelector(state => state.ui) || {}
  const dispatch = useDispatch()
  let history = useHistory()
  const onSubmit = ({ author, title, url }) =>
    dispatch(async dispatch => {
      try {
        const newBlog = await blogService.create({ author, title, url })
        const message = `New blog ${title} created!`
        dispatch({ type: 'blogs.new()', data: { ...newBlog } })
        dispatch({ type: 'notification.setMessage()', data: { message } })
      } catch (error) {
        const message = `Cannot create blog with title ${title}!`
        dispatch({ type: 'notification.setMessage()', data: { message } })
      }
    })
  const onClickTableRow = blog => history.push(`/blogs/${blog.id}`)
  return (
    <>
      <BlogList blogs={blogList} onClickTableRow={onClickTableRow} />
      <CreateBlogDialog {...ui.createBlogDialog} onSubmit={onSubmit} />
    </>
  )
}

export const BlogDetailView = ({ id }) => {
  const blogList = useSelector(state => state.blogs)
  const blog = blogList.find(blog => blog.id === id)
  const login = useSelector(state => state.login)
  const dispatch = useDispatch()
  let history = useHistory()

  /** "unpopulate" */
  const normalize = blog => ({
    ...blog,
    user: blog.user.id,
    comments: blog.comments.map(comment => comment.id)
  })

  const likeBlog = () =>
    dispatch(async dispatch => {
      const newBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blog, normalize(newBlog))
      dispatch({ type: 'blogs.update()', data: { ...newBlog } })
      const message = `Like +1 for blog ${blog.title}`
      dispatch({ type: 'notification.setMessage()', data: { message } })
    })

  const deleteBlog = () =>
    dispatch(async dispatch => {
      try {
        await blogService.delete(blog)
        history.push('/')
        dispatch({ type: 'blogs.delete()', data: { ...blog } })
        const message = `Blog ${blog.title} deleted succesfully!`
        dispatch({ type: 'notification.setMessage()', data: { message } })
      } catch (error) {
        const message = `Unable to delete blog ${blog.title}!`
        dispatch({ type: 'notification.setMessage()', data: { message } })
      }
    })

  const commentBlog = comment =>
    dispatch(async dispatch => {
      const newComment = await blogService.createComment(blog, comment)
      const newBlog = { ...blog, comments: [...blog.comments, newComment] }
      await blogService.update(blog, normalize(newBlog))
      dispatch({ type: 'blogs.update()', data: { ...newBlog } })
      const message = `Blog commented: ${comment}`
      dispatch({ type: 'notification.setMessage()', data: { message } })
    })

  const props = {
    ...blog,
    showDeleteButton: login.username === blog.user.username,
    onClickLike: likeBlog,
    onDeleteBlog: deleteBlog,
    onAddComment: commentBlog
  }

  return blog ? <BlogDetail {...props} /> : null
}

export const UserListView = () => {
  const users = useSelector(state => state.users)
  let history = useHistory()
  const cb = user => history.push(`/users/${user.id}`)
  return <UserList users={users} onClickTableRow={cb} />
}

export const UserDetailView = ({ id }) => {
  const users = useSelector(state => state.users)
  let history = useHistory()
  const cb = blog => history.push(`/blogs/${blog.id}`)
  const user = users.find(user => user.id === id)
  return user ? <UserDetail user={user} onClickTableRow={cb} /> : null
}

/* Routes */

const BlogListRoute = () => {
  const render = () => <BlogListView />
  return <Route exact path="/" render={render} />
}

const BlogDetailRoute = () => {
  const render = ({ match }) => <BlogDetailView id={match.params.id} />
  return <Route exact path="/blogs/:id" render={render} />
}

const UserListRoute = () => {
  const render = () => <UserListView />
  return <Route exact path="/users" render={render} />
}

const UserDetailRoute = () => {
  const render = ({ match }) => <UserDetailView id={match.params.id} />
  return <Route exact path="/users/:id" render={render} />
}

/* App */

/*
 * The purpose of this custom hook is simple. It just returns true/false
 * depending is user logged in or not. */
const useLoggedIn = () => {
  const login = useSelector(state => state.login) || {}
  return !!login.token
}

const AuthorizedUsers = ({ children }) => (useLoggedIn() ? children : null)

const UnAuthorizedUsers = ({ children }) => (useLoggedIn() ? null : children)

const LoadingView = () => {
  return (
    <div align="center">
      <CircularProgress />
    </div>
  )
}

const useApp = () => {
  const [usersReady, setUsersReady] = useState(false)
  const [blogsReady, setBlogsReady] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    console.log('useAppInit(): Initializing application.')
    dispatch(async dispatch => {
      const blogs = await blogService.getAll()
      dispatch({ type: 'blogs.initialize()', data: { blogs } })
      setBlogsReady(true)
    })
    dispatch(async dispatch => {
      const users = await usersService.getAll()
      dispatch({ type: 'users.initialize()', data: { users } })
      setUsersReady(true)
    })
    const loginInfo = window.localStorage.getItem('BlogListUser')
    if (loginInfo) {
      const user = JSON.parse(loginInfo)
      blogService.setToken(user.token)
      dispatch({ type: 'login.login()', data: { ...user } })
    }
    console.log('useAppInit(): Application initialized.')
  }, [dispatch, setUsersReady, setBlogsReady])

  return blogsReady && usersReady
}

export function App() {
  const ready = useApp()

  return ready ? (
    <Layout>
      <UnAuthorizedUsers>
        <LoginView />
      </UnAuthorizedUsers>
      <AuthorizedUsers>
        <BlogListRoute />
        <BlogDetailRoute />
        <UserListRoute />
        <UserDetailRoute />
      </AuthorizedUsers>
    </Layout>
  ) : (
    <Layout>
      <LoadingView />
    </Layout>
  )
}

const RoutedApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

export default RoutedApp
