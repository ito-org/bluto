const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const port = process.env.PORT || 8080
let router = express.Router()

// sample data
let cases = [
    {
        'UUID': '127e391e-6bb1-11ea-bc55-0242ac130001',
        'timestamp': '2020-03-21T20:23:11.589Z',
        'region': 41
    },
    {
        'UUID': '127e391e-6bb1-11ea-bc55-0242ac130002',
        'timestamp': '2020-03-21T20:23:11.589Z',
        'region': 42
    },
    {
        'UUID': '127e391e-6bb1-11ea-bc55-0242ac130003',
        'timestamp': '2020-03-21T20:23:11.589Z',
        'region': 42
    }
]

router.get('/cases', (req, res) => {
    const queryRegion = req.query.region
    const filtered = cases.filter(single => single.region == queryRegion)
    res.json(filtered)
})

router.get('/', (req, res) => {
    console.log('hi')
    res.json({message: 'hooray! welcome to our api! GET /cases?region=x for data.'})
})

const apiBase = '/'
app.use(apiBase, router)
app.listen(port)

console.log('Magic happens on port ' + port)
