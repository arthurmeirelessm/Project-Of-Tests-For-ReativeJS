const test = () => console.log("Hellooooooooooooo")


const { Certificate } = require('crypto')
//function test foi feito somente para testes de caminho do module exports
//-------------------------------------------------------------------------------------------------------------------


const fn = require('fs')
const { resolve } = require('path')
const path = require('path')
const { nextTick } = require('process')
const { Observable } = require('rxjs')

function readPath(pathToPath) {
    return new Observable((subscriber) => {
        try {
            fn.readdirSync(pathToPath).forEach(archive => {
                subscriber.next(path.join(pathToPath, archive))
            })
            subscriber.complete()
        } catch (e) {
            subscriber.error(e)
        }
    })
}


//FUNÇÃO PARA LEITURA DE ARQUIVO PASSADO (legendas) / UMA FUNÇÃO PAI QUE UTILIZA O NEW PROMISE POSSÍBILITANDO A LÓGICA FUNCIONAL DO PROJETO NO ARQUIVO DE INDEX.JS

function readFile(pathToPath) {
    return createPipeableOperator(subscriber => ({
        next(pathToPath) {
            try {
                const content = fn.readFileSync(pathToPath, { encoding: 'utf-8' })
                subscriber.next(content.toString())
                subscriber.complete()
            } catch (e) {
                subscriber.error(e)
            }
        }
    }))
}


function elementsEndingWith(patternText) {
    return createPipeableOperator(subscriber => ({
        next(text) {
            if (text.endsWith(patternText)) {
                subscriber.next(text)
            }
        }
    }))
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


function createPipeableOperator(operatorFn) {
    return function (source) {
        return new Observable(subscriber => {
            const sub = operatorFn(subscriber)
            source.subscribe({
                next: sub.next,
                error: sub.complete || (e => subscriber.complete(e)),
                complete: sub.complete || (e => subscriber.complete(e))
            })
        })
    }
}






module.exports = {
    readPath,
    readFile,
    elementsEndingWith,
    removeSrt,
    removeSpaces,
    removeTimes,
    removeIfOnlyNumber,
    removeSimbols
}
