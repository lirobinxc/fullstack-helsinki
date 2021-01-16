const express = require('express');
const app = express();

// import notes
let notes = require('./notesDB')

// Middleware
function logger(req, res, next) {
  console.log('before')
  next()
  console.log('after')
}
app.use(logger)

app.use((req, res, next) => {
  console.log('LOGGED')
  next()
})

// GET
app.get('/', (req, res) => {
  res.send('<h1>Welcome home</h1>')
  console.log('📣 GET SUCCESS ~')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
  console.log('📣 GET SUCCESS ~')
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  console.log('📣 note ~', note)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end('404 - No object here')
  }
  console.log('📣 GET SUCCESS ~')
})

// Generate ID
function generateId() {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(ele => ele.id))
    : 0
  return maxId + 1
}

// POST
app.use(express.json())  // parses JSON in the request body into a JS object
app.post('/api/notes', (req, res) => {
  // Makes sure body isn't empty
  const body = req.body
  
  if (!body.content) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    name: body.name,
    content: body.content,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(note)
  res.json(note)
  console.log('📣 POST SUCCESS ~')
})

// DELETE
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).end()
  console.log('📣 DELETE SUCCESS ~')
})

// RUN SERVER
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
})