const path = require('path')
const fn = require('./functionsToRequire')


const pathToDirectoty = path.join(__dirname, '..', 'legendas')


fn.readPath(pathToDirectoty)
    .then(archive => fn.removeSrt(archive, '.srt'))
    .then(archiveSrt => fn.readFiles(archiveSrt))
    .then(console.log)


