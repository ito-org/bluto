module.exports = {
    'getCasesByRegion': (db, region) => {
        const lat = 42
        const long = 42

        // TODO fetch from db
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
        return cases
    }
}
