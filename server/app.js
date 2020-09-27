require('dotenv').config()
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send({ message: 'Success' })
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on PORT = ${process.env.PORT}`)
})
