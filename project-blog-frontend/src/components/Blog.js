import React from 'react'
import blogService from '../services/blogService'

const Blog = ({ blogObj, toggleUpdateBlogs, handleErrorMsg }) => {

  const handleDelete = async (e) => {
    const id = e.target.name
    try {
      await blogService.deleteBlog(id)
      toggleUpdateBlogs()
    } catch(err) {
      handleErrorMsg()
    }
  }

  return (
    <li>
      <span style={{color:"blue", fontWeight:"bold"}}>{blogObj.title}</span> - {blogObj.author} - <span style={{color:"red"}}>Likes: {blogObj.likes}</span>
      &nbsp; <input type="button" name={blogObj.id} value="Delete" onClick={handleDelete}/>
    </li>
  )
}

export default Blog