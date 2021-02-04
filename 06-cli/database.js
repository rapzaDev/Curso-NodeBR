const { readFile, writeFile } = require('fs')

const { promisify } = require('util')

const readFileAsync = promisify(readFile)

const writeFileAsync = promisify(writeFile)

class Database {
    
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo (){
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }

    async escreverArquivo (dados) {    
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar (heroi) {
        const dados = await this.obterDadosArquivo()
        const id = heroi.id ? heroi.id : Date.now()

        const heroiComId = {
            id,
            ...heroi
        }

        const dadosFinal = [
            ...dados,
            heroiComId
        ]

        const resultado = await this.escreverArquivo(dadosFinal)

        return resultado
    }

    async listar (id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => id ? (item.id === id) : true)
        
        return dadosFiltrados
    }

    async deletarHeroi (id) {        
        if ( !id ) 
        return await this.escreverArquivo([]);

        const dados = await this.obterDadosArquivo()

        const indice = dados.findIndex(heroi => heroi.id === parseInt(id))

        if ( indice === -1 )  
        throw new Error('[ id ] invalido! Seu heroi não existe.')

        dados.splice(indice,1)

        return await this.escreverArquivo(dados)
    }

    async atualizarHeroi (id, newData) {
        const dados = await this.obterDadosArquivo()

        const indice = dados.findIndex(heroi => heroi.id === parseInt(id))

        if ( indice === -1 )  
        throw new Error('[ id ] invalido! Seu heroi não existe.')

        const atual = dados[indice]
        
        const heroiAtualizado = {
            ...atual,
            ...newData
        }

        dados.splice(indice,1)


        return await this.escreverArquivo([...dados, heroiAtualizado])
    }
}

module.exports = new Database()