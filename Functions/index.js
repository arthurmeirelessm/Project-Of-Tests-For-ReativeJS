const path = require('path')
const fn = require('./functionsToRequire')


const pathToDirectoty = path.join(__dirname, '..', 'legendas')


fn.readPath(pathToDirectoty)
    .then(archive => fn.removeSrt(archive, '.srt'))
    .then(archiveSrt => fn.readFiles(archiveSrt))
    .then(contents => contents.join('\n'))
    .then(allCotents => allCotents.split('\n'))
    .then(linesWithSpace => fn.removeSpaces(linesWithSpace))
    .then(archive => fn.removeTimes(archive, '-->'))
    .then(archive => fn.removeIfOnlyNumber(archive))
    .then(console.log)

