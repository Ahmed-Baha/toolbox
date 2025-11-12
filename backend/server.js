require('dotenv').config()
const app = require('./app')
const { connect } = require('./config/db')

const PORT = process.env.PORT || 4000
const URI = process.env.MONGODB_URI

connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('server on', PORT)
    })
  })
  .catch(err => {
    console.error('db connect error', err)
    process.exit(1)
  })
