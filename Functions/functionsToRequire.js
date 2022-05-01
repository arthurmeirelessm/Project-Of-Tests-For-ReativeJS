const test = () => console.log("Hellooooooooooooo")


const { Certificate } = require('crypto')
//function test foi feito somente para testes de caminho do module exports
//-------------------------------------------------------------------------------------------------------------------


const fn = require('fs')
const { resolve } = require('path')
const path = require('path')

function readPath(pathToPath) {
    return new Promise((resolve, reject) => {
        try {
            let archive = fn.readdirSync(pathToPath)
            archive = archive.map(archive => path.join(pathToPath, archive))
            resolve(archive)
        } catch (e) {
            reject(e)
        }
    })
}


//FUNÇÃO PARA LEITURA DE ARQUIVO PASSADO (legendas) / UMA FUNÇÃO PAI QUE UTILIZA O NEW PROMISE POSSÍBILITANDO A LÓGICA FUNCIONAL DO PROJETO NO ARQUIVO DE INDEX.JS

function readFile(pathToPath) {
    return new Promise((resolve, reject) => {
        try {
            const content = fn.readFileSync(pathToPath, { encoding: 'utf-8' })
            resolve(content)
        } catch (e) {
            reject(e)
        }
    })
}


function readFiles(pathToPaths) {
    return Promise.all(pathToPaths.map(pathToPath => readFile(pathToPath)))
}




//REMOVE O .SRT DOS FINS DAS NOMECLATURAS DOS ARQUIVOS

function removeSrt(arr, standard) {
    return arr.filter(el => el.endsWith(standard))
}

//REMOVE OS ESPAÇOS EM BRANCO DOS TEXTOS DO ARQUIVO

function removeSpaces(arr) {
    return arr.filter(el => el.trim())
}


//REMOVE TRECHO DE HORARIO SETADO POR '-->'

function removeTimes(arr, standard) {
    return arr.filter(el => !el.includes(standard))
}


//REMOVE NÚMEROS DOS TEXTOS DO ARQUIVO

function removeIfOnlyNumber(arr) {
    return arr.filter(el => {
        const num = parseInt(el.trim())
        return !(num != 0 && !!num)
    })
}

//REMOVE SIMBOLOS DO TEXTOS DO ARQUIVO

function removeSimbols(simbols) {
    return function (arr) {
        return arr.map(el => {
            let newTextWithoutSimbols = el
            simbols.forEach(simbol => {
                newTextWithoutSimbols = newTextWithoutSimbols.split(simbol).join('')
            })

            return newTextWithoutSimbols
        })
    }
}



module.exports = {
    readPath,
    readFiles,
    removeSrt,
    removeSpaces,
    removeTimes,
    removeIfOnlyNumber,
    removeSimbols
}
