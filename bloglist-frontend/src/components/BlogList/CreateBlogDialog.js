import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Fab,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    float: 'right'
  }
}))

/** Renders a dialog for create a new blog. Dialog opens when button is pressed.
 *  This component can be used with external state manager like Redux or let
 *  component handle it internal state. */
function CreateBlogDialog({
  open,
  author,
  title,
  url,
  onOpen,
  onClose,
  onChangeAuthor,
  onChangeTitle,
  onChangeUrl,
  onSubmit,
  onCancel
}) {
  const classes = useStyles()

  const initialState = { open: false, author: '', title: '', url: '' }
  const [state, setState] = useState(initialState)

  const handleOpenDialog = () => {
    setState({ ...state, open: true })
    onOpen && onOpen()
  }

  const handleSubmit = event => {
    event.preventDefault()
    const author = event.target.author.value
    const title = event.target.title.value
    const url = event.target.url.value
    onSubmit({ author, title, url })
    setState(initialState)
  }

  const handleCancel = () => {
    setState({ ...state, open: false })
    onCancel && onCancel()
  }

  return (
    <div>
      <div id="newBlog">
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpenDialog}
          className={classes.fab}
        >
          <AddIcon />
        </Fab>
      </div>
      <Dialog
        open={open || state.open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add new blog</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add new blog post, give title, author and url.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="author"
              label="Author"
              fullWidth
              value={author || state.author}
              onChange={event => {
                setState({ ...state, author: event.target.value })
                onChangeAuthor && onChangeAuthor(event.target.value)
              }}
            />
            <TextField
              margin="dense"
              id="title"
              label="Title"
              fullWidth
              value={title || state.title}
              onChange={event => {
                setState({ ...state, title: event.target.value })
                onChangeTitle && onChangeTitle(event.target.value)
              }}
            />
            <TextField
              margin="dense"
              id="url"
              label="Url"
              fullWidth
              value={url || state.url}
              onChange={event => {
                setState({ ...state, url: event.target.value })
                onChangeUrl && onChangeUrl(event.target.value)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} color="primary">
              Cancel
            </Button>
            <Button
              disabled={
                !(author || state.author) ||
                !(title || state.title) ||
                !(url || state.url)
              }
              type="submit"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

CreateBlogDialog.propTypes = {
  /** Boolean to show is dialog open or not. */
  open: PropTypes.bool.isRequired,
  /** Value of the text field `author` */
  author: PropTypes.string,
  /** value of the text field `title` */
  title: PropTypes.string,
  /** Value of the text field `url` */
  url: PropTypes.string,
  /** Function to trigger when dialog is opened. */
  onOpen: PropTypes.func,
  /** Function to trigger when dialog is closed. */
  onClose: PropTypes.func,
  /** Function to tigger when dialog is submitted. */
  onSubmit: PropTypes.func,
  /** Function to trigger when submission is cancelled. */
  onCancel: PropTypes.func,
  /** Function to call when text in author field is changed. */
  onChangeAuthor: PropTypes.func,
  /** Function to call when text in title field is changed. */
  onChangeTitle: PropTypes.func,
  /** Function to call when text in url field is changed. */
  onChangeUrl: PropTypes.func
}

CreateBlogDialog.defaultProps = {
  open: false,
  onSubmit: () =>
    console.warn('Please implement function `onSubmit(author, title, url)`')
}

export default CreateBlogDialog
