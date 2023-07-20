const fs = require('fs')
const moment = require('moment')

// Load the existing config
const config = require('./lambdatest-config.json')

// Update the build name
config.run_settings.build_name = `starlight-test-suite-run-${moment().format('YYYYMMDD-hhmmA')}`

// Save the updated config
fs.writeFileSync('./lambdatest-config.json', JSON.stringify(config, null, 2))
