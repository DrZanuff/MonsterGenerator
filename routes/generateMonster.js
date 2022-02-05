const router = require('express').Router()
const faker = require('faker')
const axios = require('axios').default
const Monster = require('../models/monster')
require('dotenv').config()

const dndBaseUrl = 'https://www.dnd5eapi.co'
axios.defaults.baseURL = dndBaseUrl

router.get('/', async (req, res) => {
  try {
    const monsterList = (await axios.get('api/monsters/')).data

    const totalMonstersType = monsterList.count
    const monsterType =
      monsterList.results[Math.floor(Math.random() * totalMonstersType)]

    const monsterData = (await axios.get(monsterType.url)).data

    const imageApiKey = process.env.IMAGE_API_KEY

    const words = ['', 'rpg', 'concept', 'concept+art', 'artstation', 'monster']
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

    axios.defaults.baseURL = ''
    const imageData = (
      await axios.get(
        `https://serpapi.com/search.json?q=${monsterData.name}+${words[0]}&tbm=isch&ijn=0&api_key=${imageApiKey}`
      )
    ).data

    const imageUrl =
      imageData.images_results[
        Math.floor(Math.random() * imageData.images_results.length)
      ].original

    const monster = {
      name: `${faker.hacker.adjective()} ${faker.name.firstName()}`,
      type: monsterData.name,
      image: imageUrl,
      size: monsterData.size,
      race: String(monsterData.type).toUpperCase(),
      alignment: String(monsterData.alignment).toUpperCase(),
      hit_points: Math.max(
        10,
        monsterData.hit_points + Math.floor((0.5 - Math.random()) * 10)
      ),
      strength: Math.max(
        1,
        monsterData.strength + Math.floor((0.5 - Math.random()) * 5)
      ),
      dexterity: Math.max(
        1,
        monsterData.dexterity + Math.floor((0.5 - Math.random()) * 5)
      ),
      constitution: Math.max(
        1,
        monsterData.constitution + Math.floor((0.5 - Math.random()) * 5)
      ),
      intelligence: Math.max(
        1,
        monsterData.intelligence + Math.floor((0.5 - Math.random()) * 5)
      ),
      wisdom: Math.max(
        1,
        monsterData.wisdom + Math.floor((0.5 - Math.random()) * 5)
      ),
      charisma: Math.max(
        1,
        monsterData.charisma + Math.floor((0.5 - Math.random()) * 5)
      ),
    }

    await Monster.create(monster)

    res.status(200).json({ message: monster })
  } catch (error) {
    res.json({
      message: 'Something is wrong, please try again later...',
      error,
    })
  }
})

module.exports = router
