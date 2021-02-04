const { deepStrictEqual, ok  } = require('assert')

const database = require('./database')


const DEFAULT_ITEM_CADASTRAR = {
    nome: 'Flash',
    poder: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Necromancer',
    poder: 'Black Magic',
    id: 3
}

describe('Suite de manipulação de Herois', () => {
    
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
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

    it('Deve excluir um heroi por id, usando arquivos', async () => {
        const expected = true;

        const resultado = await database.deletarHeroi(DEFAULT_ITEM_CADASTRAR.id)

        deepStrictEqual(resultado, expected)
    })

    it('Deve atualizar um heroi pelo id, usando arquivos', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            poder: 'Dark Magic'
        }

        const novoDado = {
            poder: 'Dark Magic'
        }

        await database.atualizarHeroi(DEFAULT_ITEM_ATUALIZAR.id, novoDado)

        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        
        deepStrictEqual(resultado, expected)
    })
})
