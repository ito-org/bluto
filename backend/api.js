const express = require('express')
const bodyParser = require('body-parser')
const assert = require('assert')

const initDb = require('./db.js').initDb
const getDb = require('./db.js').getDb
const dbHelpers = require('./db-helpers.js')

const apiBase = '/'
const port = 8080

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let router = express.Router()

router.get(apiBase + 'cases', (req, res) => {
    const region = req.query.region
    const cases = dbHelpers.getCasesByRegion(region)
    res.json(cases)
})

router.get(apiBase, (req, res) => {
    res.json({message: 'hooray! welcome to our api! GET /cases?region=x for data.'})
})

app.use(apiBase, router)

initDb((err) => {
    assert.equal(null, err)
    app.listen(process.env.PORT || port)
    console.log('Magic happens on port ' + port)
})
