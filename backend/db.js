const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const uri = 'mongodb://172.31.16.148:27017' // private ip

const dbName = 'bluto'

let _db = undefined

const initDb = (cb) => {
    if(_db) {
        console.warn('Trying to init db again!')
        return cb(null, _db)
    }

    MongoClient.connect(uri, {useUnifiedTopology: true}, (err, db) => {
        if(err) {
            console.error('Could not initialize DB')
            return(cb(err))
        }
        console.log('DB initialized.')
        _db = db
        return cb(null, _db)
    })
    return true
}

const getDb = () => {
    assert.ok(_db, 'DB not initialized, call init first!')
    return _db
}

module.exports = {
    initDb,
    getDb
}
