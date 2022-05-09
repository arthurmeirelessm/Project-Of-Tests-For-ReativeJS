const path = require('path')
const fn = require('./functionsToRequire')


const pathToDirectoty = path.join(__dirname, '..', 'legendas')


const simbols = [
    '.', '?', '-', ',', '"', '♪', '_', '<i>', '</i>', '\r', '[', ']', '(', ')'
]



//AGRUPA AS PALAVRAS

function groupWord(word) {
    return Object.values(word.reduce((acc, word) => {
        const el = word.toLowerCase()
        const qtde = acc[el] ? acc[el].qtde + 1 : 1
        acc[el] = { elemento: el, qtde: qtde }
        return acc
    }, {}))
}



//ÚLTIMA ETAPA DO PROJETO: DEPOIS QUE TODAS AS TRATATIVAS SÃO FEITAS, BASTA SABER AGORA QUAL PALAVRA APARECEU MAIS VEZES NA SÉRIE. VAMOS ULTILIZAR O SORT() PRA ISSO.

function ApplicationOfSortToQtde(attr, standard = 'asc') {
    return function (arr) {
        const asc = (o1, o2) => o1[attr] - o2[attr]
        const desc = (o1, o2) => o2[attr] - o1[attr]
        return arr.sort(standard === 'asc' ? asc : desc)
    }
}

//MERGECONTENTS: UNE O ARRAY
//SEPATEFORLINES: SEPARA AS PALAVRAS POR LINHAS
//SEPATEFORWORD: SEPARA POR PALAVRA

const mergeContents = arr => arr.join(' ')
const separateForLines = allContents => allContents.split('\n')
const separateForWord = allContents => allContents.split(' ')



//ABAIXO EXISTE TODOS OS TIPOS DE TESTES SOBRE TRATATIVAS DE DADOS FEITO PRA COMPOR O OBJETIVO DO PROJETO, TESTAR O MAIOR NÚMERO DE FUNÇÕES REATIVAS POSSÍVEIS

/*fn.readPath(pathToDirectoty)
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
    .then(ApplicationOfSortToQtde('qtde', 'desc'))
    .then(console.log)*/


fn.readPath(pathToDirectoty)
    .pipe(
        fn.elementsEndingWith('.srt'),
        fn.readFile()
    )
    .subscribe(console.log)





