const test = () => console.log("Hellooooooooooooo")


//function test foi feito somente para testes de caminho do module exports
//-------------------------------------------------------------------------------------------------------------------


const fn = require('fs')

function readPath (path) {
   let archive = fn.readdirSync(path)
   console.log(archive)
}

module.exports = {
    test, readPath
}
