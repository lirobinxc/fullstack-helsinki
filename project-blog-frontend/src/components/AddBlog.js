import React, { useState } from 'react'
import blogService from '../services/blogService'
import ErrorMessage from '../components/ErrorMessage'

const AddBlog = ({ user, setAddedBlog }) => {
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
    console.log(`📣 AddBlog- user ~`, user)
    console.log(`📣 token ~`, user.token)
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${user.token}`
    }
    try {
      const newBlog = await blogService.postBlog(blogData, headers)
      console.log(`📣 newBlog ~`, newBlog)
      setAddedBlog(true)
      setTimeout(() => {
        setTitle('')
        setAuthor('')
        setUrl('')
        setAddedBlog(false)
      }, 3000)
    } catch(err) {
      setErrorMsg('Could not post the blog, something went wrong')
      setTimeout(() => {
        setErrorMsg('')
      }, 2500)
    }
  }

  return (
    <div>
      {
        errorMsg === ''
          ? null
          : <ErrorMessage msg={errorMsg} />
      }
      <form onSubmit={handleSubmit}>
        Title: <input type="text" name="blogTitle" onChange={e => setTitle(e.target.value)} /> <br/>
        Author: <input type="text" name="blogAuthor" onChange={e => setAuthor(e.target.value)} /> <br/>
        URL: <input type="text" name="blogUrl" onChange={e => setUrl(e.target.value)} /> <br/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default AddBlog