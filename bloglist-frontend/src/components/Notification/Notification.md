Write message to input field to see message on bottom left. Message can be
hidden by clicking close button on message or giving empty message.

```jsx
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const [message, setMessage] = React.useState('')

function onClose(event, reason) {
  if (reason === 'clickaway') {
    return
  }
  setMessage('')
}

;<Container maxWidth="sm">
  <form>
    <TextField
      variant="outlined"
      margin="normal"
      label="Message"
      fullWidth
      value={message}
      onChange={event => setMessage(event.target.value)}
    />
  </form>
  <Notification message={message} onClose={onClose} />
</Container>
```
