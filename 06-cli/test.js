const { deepStrictEqual, ok  } = require('assert')

const database = require('./database')


const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

describe('Suite de manipulação de Herois', () => {
    
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    })

    it('Deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)

        deepStrictEqual(resultado, expected)
    })

    it('Deve cadastrar um heroi, usando arquivos', async () => {
        const expected = {
            nome: 'Batman',
            poder: 'Astucia',
            id: 2,
        }

        await database.cadastrar(expected)

        const [actual] = await database.listar(expected.id)

        deepStrictEqual(actual, expected)
    })
})
