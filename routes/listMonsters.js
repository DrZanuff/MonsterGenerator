const router = require('express').Router()
const Monster = require('../models/monster')

router.get('/', async (req, res) => {
  try {
    const monsterList = await Monster.find({}, { __v: 0 })

    res.status(200).json({ monsterList })
  } catch (error) {
    res.status(500).json({
      message: 'Something is wrong, please try again later...',
      error,
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const monster = await Monster.findOne({ _id: req.params.id }, { __v: 0 })

    if (!monster) {
      res.status(422).json({ message: 'Monster not found...' })
      return
    }

    res.status(200).json({ monster })
  } catch (error) {
    res.status(500).json({
      message: 'Something is wrong, please try again later...',
      error,
    })
  }
})

module.exports = router
