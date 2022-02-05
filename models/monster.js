const mongooge = require('mongoose')

const Monster = mongooge.model('Monster', {
  name: String,
  type: String,
  image: String,
  size: String,
  race: String,
  alignment: String,
  hit_points: Number,
  strength: Number,
  dexterity: Number,
  constitution: Number,
  intelligence: Number,
  wisdom: Number,
  charisma: Number,
})

module.exports = Monster
