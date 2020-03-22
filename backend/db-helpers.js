const assert = require('assert')

module.exports = {
    insertSampleData: (db) => {
        // sample data
        db.collection('cases').insertMany([
            {
                UUID: '127e391e-6bb1-11ea-bc55-0242ac130002',
                timestamp: ISODate("2020-03-22T11:14:40.456Z"),
                lat: 42.1,
                long: 42.1
            },
            {
                UUID: '127e391e-6bb1-11ea-bc55-0242ac130002',
                timestamp: ISODate("2020-03-22T11:14:40.456Z"),
                lat: 42.1,
                long: 42.1
            },
            {
                UUID: '127e391e-6bb1-11ea-bc55-0242ac130003',
                timestamp: new Date(),
                lat: 42.1,
                long: 42.1
            }
        ])
    },

    getCasesByLocation: async (db, lat, long) => {
        lat = parseFloat(lat)
        long = parseFloat(long)
        assert.equal(false, isNaN(lat))
        assert.equal(false, isNaN(long))

        let cases = await db.collection('cases').find({lat: lat, long: long}).toArray()
        return cases
    },

    insertCases: async (db, cases) => {
        assert.equal('object', typeof(cases))

        cases.forEach((singleCase) => {
            assert.equal('object', typeof(singleCase.timestamp))
            assert.equal('string', typeof(singleCase.UUID))
            assert.equal('number', typeof(singleCase.lat))
            assert.equal('number', typeof(singleCase.long))
            db.collections.insert(singleCase)
        })
    }
}
