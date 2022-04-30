const path = require('path')
const fn = require('./functionsToRequire')


const pathToDirectoty = path.join(__dirname, '..', 'legendas')

fn.readPath(pathToDirectoty)

