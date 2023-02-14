const connectToMongo = require('./db')
const express = require('express')
const router = express.Router();

connectToMongo();
const app = express()
const port = 3000


// available Routes

app.use('/api/auth', require('./routes/auth.js')) 
app.use('/api/notes', require('./routes/notes.js')) 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = router ;