const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(express.json())

const port = process.env.PORT || 4001

//Generate a New Monster
const generateRoute = require('./routes/generateMonster')
app.use('/generate', generateRoute)

//Retrive Mosnters
const listMonsters = require('./routes/listMonsters')
app.use('/monsters', listMonsters)

const DB_USER = process.env.USER
const DB_PASSWORD = process.env.PASSWORD

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ye4tn.mongodb.net/MonsterDB?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Database is connected!')
    app.listen(port, () => console.log(`Server is running on port ${port}`))
  })
  .catch((e) => console.log(e))
