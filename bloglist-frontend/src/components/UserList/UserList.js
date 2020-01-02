import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'

/**
 * Renders a table of users and how many blogs they have been adding to system.
 */
function UserList({ users, onClickTableRow }) {
  const UserTableRow = ({ user }) => {
    // const onClick = () => onClickTableRow(user)
    return (
      <TableRow hover onClick={() => onClickTableRow(user)}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell align="center">{user.blogs.length}</TableCell>
      </TableRow>
    )
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell align="center">Blogs</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => (
          <UserTableRow key={user.id} user={user} />
        ))}
      </TableBody>
    </Table>
  )
}

UserList.propTypes = {
  /** A list of users */
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      blogs: PropTypes.array.isRequired
    })
  ),
  /** Function triggers when user clicks some row on table. */
  onClickTableRow: PropTypes.func
}

UserList.defaultProps = {
  users: [],
  onClickTableRow: () => null
}

export default UserList
