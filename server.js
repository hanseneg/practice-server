const express = require('express')
const app = express()
const morgan = require('morgan')

//middleware
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/tasks', require('./routes/taskRouter.js'))

//error handler
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

app.listen(8500, () => {
    console.log('The server is running on Port 8500.')
})