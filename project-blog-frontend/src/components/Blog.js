import React, { useState } from 'react'
import blogService from '../services/blogService'

const Blog = ({ blogObj, toggleUpdateBlogs }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleDelete = async (e) => {
    const id = e.target.name
    setIsDeleting(true)
    try {
      await blogService.deleteBlog(id)
      setIsDeleting(false)
      toggleUpdateBlogs()
    } catch(err) {
      setIsError(true)
      setTimeout(() => {
        setIsDeleting(false)
        setIsError(false)
      }, 2500)
    }
  }

  const deleteButton = () => (
    <input type="button" name={blogObj.id} value="Delete" onClick={handleDelete}/>
  )

  const errorMsg = () => (
    <span style={{color:"red", fontWeight:"bold"}}>Error deleting this blog</span> 
  )

  return (
    <li>
      <span style={{color:"blue", fontWeight:"bold"}}>{blogObj.title}</span> - {blogObj.author} - <span style={{color:"green"}}>Likes: {blogObj.likes}</span>
      &nbsp; {
        isError === true
          ? errorMsg()
          : isDeleting === true
            ? <span style={{color:"red", fontWeight:"bold"}}>Deleting blog...</span>
            : deleteButton()
      }
    </li>
  )
}

export default Blog