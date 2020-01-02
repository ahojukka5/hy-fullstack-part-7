import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'

import Notification from './Notification'

export const actions = {
  onClose: action('onClose')
}

storiesOf('Notification', module)
  .addDecorator(story => (
    <Container maxWidth="sm">
      <Paper>{story()}</Paper>
    </Container>
  ))
  .add('default', () => <Notification {...actions} message="Hello world!" />)
  .add('noshow', () => <Notification {...actions} />)
