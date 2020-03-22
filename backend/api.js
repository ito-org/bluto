const express = require('express')
const bodyParser = require('body-parser')
const assert = require('assert')

const initDb = require('./db.js').initDb
const getDb = require('./db.js').getDb
const dbHelpers = require('./db-helpers.js')

const apiBase = '/'
const port = process.env.PORT || 8080

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let router = express.Router()

router.get(apiBase + 'cases', async (req, res) => {
    const lat = req.query.lat
    const long = req.query.long
    const db = getDb()
    const cases = await dbHelpers.getCasesByLocation(db, lat, long)
    res.json(cases)
})

router.get(apiBase, (req, res) => {
    res.json({message: 'hooray! welcome to our api! GET /cases?lat=42.1&long=42.1 for data.'})
})

app.use(apiBase, router)

initDb((err) => {
    assert.equal(null, err)
    app.listen(port)
    console.log('Magic happens on port ' + port)
})
