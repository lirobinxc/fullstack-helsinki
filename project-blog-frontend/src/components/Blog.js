import React from 'react'
import blogService from '../services/blogService'
import Toggleable from './Toggleable'
import ResponsiveButtonAsync from './ResponsiveButtonAsync'

const Blog = ({ blogObj, toggleUpdateBlogs }) => {
  const handleDelete = async () => {
    const id = blogObj.id
    console.log('📣 id ~', id)
    await blogService.deleteBlog(id)
    toggleUpdateBlogs()
  }

  const handleLike = async () => {
    const id = blogObj.id
    console.log('📣 id ~', id)
    const body = {
      likes: blogObj.likes + 1
    }
    console.log(body)
    await blogService.updateBlog(id, body)
    toggleUpdateBlogs()
  }

  const listStyle = {
    border: '2px solid black',
    padding: '0.5em',
    margin: '0.5em'
  }
  const buttonStyle = {
    marginLeft: '1em',
  }

  return (

    <li style={listStyle}>
      <span style={{ color:'blue', fontWeight:'bold' }}>{blogObj.title}</span>
      <ResponsiveButtonAsync name="Delete" loadingText="Deleting..." errorMessage="Problem occured deleting this blog." onClick={handleDelete} id={blogObj.id} style={buttonStyle}/>
      <Toggleable buttonLabel="View Details">
        <div>
          <div>{blogObj.author}</div>
          <div>{blogObj.url}</div>
          <div style={{ color:'green' }}>
              Likes: {blogObj.likes}
            <ResponsiveButtonAsync name="Like" loadingText="Liking..." errorMessage="Error: Please try again." onClick={handleLike} id={blogObj.id} style={buttonStyle} />
          </div>
        </div>
      </Toggleable>
    </li>
  )
}

export default Blog