require('./db')
const express = require('express')
const router = express.Router();
const cors = require('cors')


const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// available Routes

app.use('/api/auth', require('./routes/auth.js')) 
app.use('/api/notes', require('./routes/notes.js')) 


app.listen(port, () => {
  console.log(`Pencil Notes app listening on port ${port}`)
})

module.exports = router ;