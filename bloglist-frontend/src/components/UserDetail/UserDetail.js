import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing()
  }
}))

/**
 * Prints some details about user.
 */
function UserDetail({ user, onClickTableRow }) {
  const classes = useStyles()

  function BlogTableRow({ blog }) {
    return (
      <TableRow hover onClick={() => onClickTableRow(blog)}>
        <TableCell>{blog.author}</TableCell>
        <TableCell>{blog.title}</TableCell>
        <TableCell align="center">{blog.likes}</TableCell>
      </TableRow>
    )
  }

  function BlogTableRows({ blogs }) {
    return blogs.map(blog => <BlogTableRow key={blog.id} blog={blog} />)
  }

  function BlogsTable({ user }) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="center">Likes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <BlogTableRows blogs={user.blogs} />
        </TableBody>
      </Table>
    )
  }

  return (
    <Container>
      <Typography variant="h5" color="inherit" className={classes.title}>
        {user.name}
      </Typography>
      <Divider />
      <Typography variant="h6" color="inherit">
        Added blogs
      </Typography>
      <BlogsTable user={user} />
    </Container>
  )
}

UserDetail.propTypes = {
  /** An user having a name and a list of blog entries. */
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    blogs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired
      })
    )
  }),
  /** Function triggers when user clicks some row on table. */
  onClickTableRow: PropTypes.func.isRequired
}

UserDetail.defaultProps = {
  onClickTableRow: () => null
}

export default UserDetail
