const service = require('./service')

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for (let index = 0; index < this.length; index++) {
        const resultado = callback(this[index], index)
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado
}

async function main () {
    try {
        const data = await service.obterPessoas('a')
        
        // const names = []
        // data.results.forEach(element => {
        //     names.push(element.name)
        // });

        // const names = data.results.map( pessoa => pessoa.name )
        const names = data.results.meuMap( ( pessoa, indice ) => {
            return `${indice}: ${pessoa.name}`
        })
        console.log('names: ', names)

    } catch (error) {
        console.error('Deu ruim', error)
    }
}

main()