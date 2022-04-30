const test = () => console.log("Hellooooooooooooo")


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


function readFile(pathToPath) {
      return new Promise((resolve, reject) => {
          try {
              const content = fn.readFileSync(pathToPath, {encoding: 'utf-8'})
              resolve(content)
          } catch(e) {
              reject(e)
          }
      })
}


function readFiles( pathToPaths) {
        return Promise.all(pathToPaths.map(pathToPath => readFile(pathToPath)))
}




function removeSrt(arr, standard) {
    return arr.filter(el => el.endsWith(standard))
}



function removeSpaces(arr){
    return arr.filter(el => el.trim())
}


function removeTimes(arr, standard){
    return arr.filter(el => !el.includes(standard))
}


function removeIfOnlyNumber (arr) {
    return arr.filter(el => {
        const num = parseInt(el.trim())
        return !(num != 0 && !!num)
    })
}


module.exports = {
    readPath, readFiles,  removeSrt, removeSpaces, removeTimes, removeIfOnlyNumber
}
