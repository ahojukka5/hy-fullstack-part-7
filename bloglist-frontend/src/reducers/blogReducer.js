import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS':
      console.log('Blogs initialized')
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'UPDATE_BLOG':
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      )
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INITIALIZE_BLOGS', data: blogs })
  }
}

export const newBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({ type: 'NEW_BLOG', data: newBlog })
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    await blogService.delete(blog)
    dispatch({ type: 'DELETE_BLOG', data: blog })
  }
}

export const updateBlog = (blog, data) => {
  return async dispatch => {
    await blogService.update(blog, {
      ...data,
      user: data.user.id,
      comments: data.comments.map(comment => comment.id)
    })
    dispatch({ type: 'UPDATE_BLOG', data })
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const newComment = await blogService.createComment(blog, comment)
    const comments = [...blog.comments, newComment]
    const newBlog = { ...blog, comments }
    const data = {
      ...newBlog,
      user: newBlog.user.id,
      comments: newBlog.comments.map(comment => comment.id)
    }
    await blogService.update(blog, data)
    dispatch({ type: 'UPDATE_BLOG', data: newBlog })
  }
}

export default reducer
