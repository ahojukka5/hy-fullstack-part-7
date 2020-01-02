import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  TextField,
  Typography
} from '@material-ui/core'
import {
  Error as ErrorIcon,
  LockOutlined as LockOutlinedIcon
} from '@material-ui/icons'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://ahojukka5.github.io/">
        Jukka Aho
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%' // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  errorText: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    verticalAlign: 'middle',
    display: 'inline-flex',
    color: 'red'
  },
  errorBox: {
    display: 'flex',
    minHeight: '50px',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftIcon: {
    marginRight: theme.spacing()
  }
}))

/**
 * Renders a login screen.
 *
 * This component can be used in two different ways. First one is to let
 * component internal state handle the username and password text field changes,
 * and just implement `onLogin(username, password)` function, which should throw
 * an error in the case of login failure. The other way to use compnent is to
 * use some external state manager like redux, and implement `onChangeUsername`,
 * `onChangePassword`, `onLogin`, and take care of component state (`username`,
 * `password`, `showErrorMessage`) in there.
 */
function Login({
  username,
  password,
  showErrorMessage,
  onLogin,
  onChangeUsername,
  onChangePassword
}) {
  const [state, setState] = useState({
    username: '',
    password: '',
    showErrorMessage: false
  })
  const classes = useStyles()

  function onSubmit(event) {
    event.preventDefault()
    try {
      onLogin(event.target.username.value, event.target.password.value)
      setState({ ...state, showErrorMessage: false })
    } catch (error) {
      setState({ ...state, showErrorMessage: true })
    }
    setState({ ...state, username: '', password: '' })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box className={classes.errorBox}>
          {showErrorMessage || state.showErrorMessage ? (
            <Typography variant="subtitle1" className={classes.errorText}>
              <ErrorIcon className={classes.leftIcon} /> Invalid username of
              password.
            </Typography>
          ) : null}
        </Box>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username || state.username}
            onChange={event => {
              setState({ ...state, username: event.target.value })
              onChangeUsername && onChangeUsername(event.target.value)
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password || state.password}
            onChange={event => {
              setState({ ...state, password: event.target.value })
              onChangePassword && onChangePassword(event.target.value)
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

Login.propTypes = {
  /** Function to call when `Login` button is pressed, with username and password as arguments. */
  onLogin: PropTypes.func,
  /** Function to call when username field is changed. */
  onChangeUsername: PropTypes.func,
  /** Function to call when password field is changed. */
  onChangePassword: PropTypes.func,
  /** Initial state when component is rendered. */
  initialState: PropTypes.shape({
    /** Value for username text field. */
    username: PropTypes.string,
    /** Value for password text field. */
    password: PropTypes.string,
    /** Boolean to decide whether so error message or not. */
    showErrorMessage: PropTypes.bool
  })
}

Login.defaultProps = {
  onLogin: () =>
    console.warn(
      'implement `onLogin(username, password)` callback function to handle login.'
    )
}

export default Login
