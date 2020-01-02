import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

function BlogList({ blogs, onClickTableRow }) {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Author</TableCell>
            <TableCell>Title</TableCell>
            <TableCell align="center">Likes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map(blog => (
            <TableRow hover onClick={() => onClickTableRow(blog)} key={blog.id}>
              <TableCell>{blog.author}</TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell align="center">{blog.likes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

BlogList.propTypes = {
  /** A list of blogs */
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired
    })
  ),
  /** Function to trigger when user clicks table row. */
  onClickTableRow: PropTypes.func
}

BlogList.defaultProps = {
  blogs: [],
  onClickTableRow: () => null
}
export default BlogList
