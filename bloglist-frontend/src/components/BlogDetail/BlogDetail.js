import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Link,
  List,
  ListItemText,
  TextField,
  Typography
} from '@material-ui/core'
import {
  Comment as CommentIcon,
  Delete as DeleteIcon,
  ThumbUp as ThumbUpIcon
} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
    marginRight: theme.spacing()
  },
  leftIcon: {
    marginRight: theme.spacing()
  },
  rightIcon: {
    marginLeft: theme.spacing()
  },
  iconSmall: {
    fontSize: 20
  },
  title: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing()
  }
}))

/**
 * Renders blogs with some controllers.
 */
function BlogDetail({
  id,
  author,
  title,
  likes,
  url,
  addedBy,
  comments,
  comment,
  onChangeComment,
  showDeleteButton,
  showDeleteDialog,
  onClickLike,
  onClickDelete,
  onCloseDeleteDialog,
  onConfirmDeleteBlog,
  onAddComment,
  onDeleteBlog
}) {
  const classes = useStyles()
  const [state, setState] = useState({ comment: '', showDeleteDialog: false })

  const submitComment = event => {
    event.preventDefault()
    const content = event.target.comment.value
    event.target.comment.value = ''
    setState({ ...state, comment: '' })
    onAddComment(content)
  }
  const handleDeleteClick = () => {
    setState({ ...state, showDeleteDialog: true })
    onClickDelete && onClickDelete()
  }
  const handleDeleteAbort = () => {
    setState({ ...state, showDeleteDialog: false })
    onCloseDeleteDialog && onCloseDeleteDialog()
  }
  const handleDeleteBlog = () => {
    setState({ ...state, showDeleteDialog: false })
    onConfirmDeleteBlog && onConfirmDeleteBlog()
    onDeleteBlog && onDeleteBlog(id)
  }
  return (
    <Container>
      <Typography variant="h6" className={classes.title}>
        {title}
      </Typography>
      <Typography>Blog author is {author}</Typography>
      <Typography>
        Blog address is <Link href={url}>{url}</Link>
      </Typography>
      <Typography>Blog has {likes} likes</Typography>
      <Typography>Blog is added by {addedBy}</Typography>
      <Button
        variant="contained"
        className={classes.button}
        onClick={onClickLike}
      >
        Like
        <ThumbUpIcon className={classes.rightIcon} />
      </Button>
      {showDeleteButton ? (
        <Button
          className={classes.button}
          variant="contained"
          onClick={handleDeleteClick}
        >
          Delete
          <DeleteIcon className={classes.rightIcon} />
        </Button>
      ) : null}
      <Dialog open={showDeleteDialog || state.showDeleteDialog}>
        <DialogTitle>Delete blog?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete blog:
            <br />
            <b>{title}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteAbort} color="primary">
            No
          </Button>
          <Button onClick={handleDeleteBlog} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Divider />
      <Typography variant="h6" className={classes.title}>
        Comments
      </Typography>
      {comments.length === 0 ? (
        <Typography>No comments</Typography>
      ) : (
        <List>
          {comments.map(comment => (
            <ListItemText key={comment.id}>{comment.content}</ListItemText>
          ))}
        </List>
      )}
      <Divider />
      <Typography className={classes.title} variant="h6">
        Add comment
      </Typography>
      <form onSubmit={submitComment}>
        <TextField
          autoFocus
          margin="dense"
          id="comment"
          fullWidth
          value={comment || state.comment}
          onChange={event => {
            setState({ ...state, comment: event.target.value })
            onChangeComment && onChangeComment(event.target.value)
          }}
        />
        <Button
          disabled={!(comment || state.comment)}
          type="submit"
          variant="contained"
          className={classes.button}
        >
          Add comment
          <CommentIcon className={classes.rightIcon} />
        </Button>
      </form>
    </Container>
  )
}

BlogDetail.propTypes = {
  /** Author of the blog. */
  author: PropTypes.string.isRequired,
  /** Title of the blog. */
  title: PropTypes.string.isRequired,
  /** How many likes blog has. */
  likes: PropTypes.number.isRequired,
  /** Url address to the blog. */
  url: PropTypes.string.isRequired,
  /** User who added blog. */
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  /** Comments written to this blog. */
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ),
  /** Show delete button or not. */
  showDeleteButton: PropTypes.bool,
  /** Show delete blog dialog or not. */
  showDeleteDialog: PropTypes.bool,
  /** Function triggers when user press `like` button. */
  onClickLike: PropTypes.func,
  /** Function triggers when user press `delete` button. */
  onClickDelete: PropTypes.func,
  /** Function triggers when user answer "no" in delete dialog. */
  onCloseDeleteDialog: PropTypes.func,
  /** Function triggers when user answer "yes" in delete dialog. */
  onConfirmDeleteBlog: PropTypes.func,
  /** Function triggers when user submits comment. */
  onAddComment: PropTypes.func,
  /** Text in comment text-field. */
  comment: PropTypes.string,
  /** Triggers when text is changed in comment field. */
  onChangeComment: PropTypes.func
}

BlogDetail.defaultProps = { comments: [] }

export default BlogDetail
