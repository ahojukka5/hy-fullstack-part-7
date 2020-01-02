import React from 'react'
import PropTypes from 'prop-types'

/**
 * Component renders some basic information about a blog post.
 *
 * @author [Jukka Aho](https://github.com/ahojukka5)
 */
const SimpleBlog = ({ blog: { title, author, likes }, onLike }) => (
  <div>
    <div>
      {title} {author}
    </div>
    <div>
      blog has {likes || 0} likes
      <button onClick={onLike}>like</button>
    </div>
  </div>
)

SimpleBlog.propTypes = {
  /** Contains the basic information of blog post */
  blog: PropTypes.shape({
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired
  }),

  /** Callback function is triggered when `like` button is clicked */
  onLike: PropTypes.func
}

export default SimpleBlog
