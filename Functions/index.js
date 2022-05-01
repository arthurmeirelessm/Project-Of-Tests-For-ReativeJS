const path = require('path')
const fn = require('./functionsToRequire')


const pathToDirectoty = path.join(__dirname, '..', 'legendas')


const simbols = [
    '.', '?', '-', ',', '"', '♪', '_', '<i>', '</i>', '\r', '[', ']', '(', ')'
]




function groupWord(word) {
    return Object.values(word.reduce((acc, word) => {
        const el = word.toLowerCase()
        const qtde = acc[el] ? acc[el].qtde + 1 : 1
        acc[el] = { elemento: el, qtde: qtde}
        return acc
    }, {}))
}


const mergeContents = arr => arr.join(' ')
const separateForLines = allContents => allContents.split('\n')
const separateForWord = allContents => allContents.split(' ')

fn.readPath(pathToDirectoty)
    .then(archive => fn.removeSrt(archive, '.srt'))
    .then(archiveSrt => fn.readFiles(archiveSrt))
    .then(mergeContents)
    .then(separateForLines)
    .then(contents => contents.join('\n'))
    .then(allCotents => allCotents.split('\n'))
    .then(linesWithSpace => fn.removeSpaces(linesWithSpace))
    .then(archive => fn.removeTimes(archive, '-->'))
    .then(archive => fn.removeIfOnlyNumber(archive))
    .then(fn.removeSimbols(simbols))
    .then(mergeContents)
    .then(separateForWord)
    .then(linesWithSpace => fn.removeSpaces(linesWithSpace))
    .then(archive => fn.removeIfOnlyNumber(archive))
    .then(groupWord)
    .then(console.log)

