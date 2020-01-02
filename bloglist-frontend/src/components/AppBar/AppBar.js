import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar as MuiAppBar,
  Button,
  Tabs,
  Tab,
  Toolbar,
  Typography
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}))

function AppBar({ userName, tabs, onLogout, tabValue, onChangeTab }) {
  const classes = useStyles()
  const [state, setState] = useState({ tabValue: 0 })

  const handleTabChange = (event, tabValue) => {
    setState({ ...state, tabValue })
    onChangeTab && onChangeTab(tabValue)
  }

  const IfHasUserName = ({ children }) => (userName ? children : null)

  return (
    <div className={classes.root}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Bloglist App
          </Typography>
          <IfHasUserName>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {userName}
            </Typography>
            <Button color="inherit" onClick={onLogout && onLogout}>
              <ExitToAppIcon />
            </Button>
          </IfHasUserName>
        </Toolbar>
        <Tabs value={tabValue || state.tabValue} onChange={handleTabChange}>
          {tabs.map((data, id) => (
            <Tab key={id} {...data} />
          ))}
        </Tabs>
      </MuiAppBar>
    </div>
  )
}

AppBar.propTypes = {
  /** Name of the logged in user or null. */
  userName: PropTypes.string,
  /** Tabs. Data is passed to `<Tab />` */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      component: PropTypes.elementType,
      to: PropTypes.string
    })
  ),
  /** Function to call when user click logout button. */
  onLogout: PropTypes.func,
  /** What tab number is active */
  tabValue: PropTypes.number,
  /** Function to call when user click some tab. */
  onChangeTab: PropTypes.func
}

AppBar.defaultProps = {
  tabs: []
}

export default AppBar
