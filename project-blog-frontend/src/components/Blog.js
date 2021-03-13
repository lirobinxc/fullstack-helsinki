import React from 'react'

const Blog = ({ blogObj, handleDelete }) => {

  return (
    <li>
      <span style={{color:"blue", fontWeight:"bold"}}>{blogObj.title}</span> - {blogObj.author} - <span style={{color:"red"}}>Likes: {blogObj.likes}</span>
      &nbsp; <input type="button" name={blogObj.id} value="Delete" onClick={handleDelete}/>
    </li>
  )
}

export default Blog