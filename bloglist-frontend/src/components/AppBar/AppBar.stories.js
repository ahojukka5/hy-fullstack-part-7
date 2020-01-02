import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Paper, Container } from '@material-ui/core'
import AppBar from './AppBar'

export const props1 = {
  tabs: [
    { label: 'Blogs', to: '/blogs' },
    { label: 'Users', to: '/users' }
  ],
  onLogout: action('onLogout')
}

export const props2 = {
  userName: 'Test User 2',
  tabs: [
    { label: 'Blogs', to: '/blogs' },
    { label: 'Users', to: '/users' }
  ],
  tabValue: 1,
  onLogout: action('onLogout'),
  onChangeTab: action('onChangeTab')
}

const Layout = story => (
  <Container maxWidth="sm">
    <Paper>{story()}</Paper>
  </Container>
)

storiesOf('AppBar', module)
  .addDecorator(Layout)
  .add('default', () => <AppBar />)
  .add('AppBar without userName, first tab', () => <AppBar {...props1} />)
  .add('AppBar with userName, second tab', () => <AppBar {...props2} />)
