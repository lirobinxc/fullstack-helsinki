import React, { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import blogService from '../services/blogService'

const AddBlog = ({ toggleUpdateBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const blogData = {
      title,
      author,
      url
    }
    try {
      const newBlog = await blogService.postBlog(blogData)
      console.log(`📣 newBlog ~`, newBlog)
      toggleUpdateBlogs()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch(err) {
      setErrorMsg('Could not post the blog, something went wrong')
      setTimeout(() => {
        setErrorMsg('')
      }, 2500)
    }
  }

  return (
    <div>
      <h2>Add Blog</h2>
      {
        errorMsg === ''
          ? null
          : <ErrorMessage msg={errorMsg} />
      }
      <form onSubmit={handleSubmit}>
        Title: <input type="text" name="blogTitle" value={title} onChange={(e) => setTitle(e.target.value)} /> <br/>
        Author: <input type="text" name="blogAuthor" value={author} onChange={(e) => setAuthor(e.target.value)} /> <br/>
        URL: <input type="text" name="blogUrl" value={url} onChange={(e) => setUrl(e.target.value)} /> <br/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default AddBlog