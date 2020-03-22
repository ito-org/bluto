const express = require('express')
const bodyParser = require('body-parser')
const assert = require('assert')

const initDb = require('./db.js').initDb
const getDb = require('./db.js').getDb
const dbHelpers = require('./db-helpers.js')

const apiBase = '/'
const port = process.env.PORT || 8080
const secretKey = process.env.SECRET_KEY

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

let router = express.Router()

router.get(apiBase + 'cases', async (req, res) => {
    // GET cases
    // query params: `lat`, `long`
    const lat = req.query.lat
    const long = req.query.long
    const db = getDb()
    const cases = await dbHelpers.getCasesByLocation(db, lat, long)
    res.json(cases)
})

router.post(apiBase + 'cases', async (req, res) => {
    // POST cases
    // request body:
    // [
    //     {
    //         'UUID': 'some-example-random-id',
    //         'timestamp': new Date(), 'lat': 42, 'long: 42}]
    //         'lat': 42,
    //         'long': 42
    //     },
    //  ...
    // ]
    if(req.body.secretKey == secretKey) {
        const cases = req.body.cases
        dbHelpers.insertCases(db, cases)
    }
    return res.json({message: 'Not authorized', error: 403})
})

router.get(apiBase, (req, res) => {
    res.json({message: 'Welcome to our api! Use GET /cases?lat=42.1&long=42.1 for data.'})
})

app.use(apiBase, router)

initDb((err) => {
    assert.equal(null, err)

    if(!secretKey) {
        console.error('No secretKey specified, set it as env variable `SECRET_KEY`')
        return
    }
    app.listen(port)
    console.log('Magic happens on port ' + port)
})
