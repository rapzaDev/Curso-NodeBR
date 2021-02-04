const Commander = require('commander')
const Database = require('./database')
const Heroi = require('./heroi')

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Heroi")
        .option('-p, --poder [value]', "Poder do Heroi")
        .option('-i, --id [value]', "Id do Heroi")

        .option('-c, --cadastrar', "Cadastrar um Heroi")
        .option('-l, --listar', "Listar um Heroi")
        .option('-r, --remover [value]', "Remove um Heroi pelo id")
        .option('-a, --atualizar [value]', "Atualiza um Heroi pelo id")
        
        Commander.parse(process.argv)

        const options = Commander.opts()

        const heroi = new Heroi(options)

    try {
        if(options.cadastrar) 
        {
            delete heroi.id

            const resultado = await Database.cadastrar(heroi)

            if(!resultado)
            {
                console.error('Heroi nao foi cadastrado')
                return;
            }

            console.log('Heroi cadastrado com sucesso')
        }

        if(options.listar) 
        {
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }

        if(options.remover) 
        {
            const resultado = await Database.deletarHeroi(heroi.id)
            if(!resultado)
            {
                 console.error('Nao foi possivel remover o Heroi')
                return;
            }

            console.log('Heroi removido com sucesso')
            return;
        }

        if(options.atualizar) 
        {
           const idParaAtualizar = parseInt(heroi.id)
           delete heroi.id   

           const dado = JSON.stringify(heroi)
           const heroiAtualizar = JSON.parse(dado)

           const resultado = await Database.atualizarHeroi(idParaAtualizar, heroiAtualizar)

            if(!resultado){
                console.error('Nao foi possivel atualizar o heroi')
                return;
            }

            console.log('Heroi atualizado com sucesso')
            return;
        }
    } catch (error) {
        console.error('Deu ruim', error)
    }
}

main()