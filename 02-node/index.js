const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario (callback) {
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento : new Date()
            })
        }, 1000)

    })
    
}

function obterTelefone (userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                telefone: '96000067',
                ddd: 79
            })
        }, 2000)
    })
}

function obterEndereco (userId, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'babilon',
            numero: 0
        })
    }, 2000)
}

obterUsuario(function resolverUsuario(erro, usuario) {
     if(erro){
         console.error('Deu ruim em USUARIO', erro)
         return;
     }

     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
        if(error1){
            console.log('Deu ruim em telefone', erro1)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if(error2){
                console.error('Deu ruim em ENDERECO', error2)
                return;
            }
   
            console.log(`
           Usuario: ${usuario.nome},
           Endereço: ${endereco.rua},${endereco.numero}
           Telefone: (${telefone.ddd}) ${telefone.telefone}
           `)
           
        })
     })

     
})

main()
async function main () {
    try {
        console.time('medida-promise')

        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
            Nome: ${usuario.nome}
            Telefone: (${telefone.ddd}) ${telefone.telefone}
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)

        console.timeEnd('medida-promise')
    } catch (error) {
        console.error('Deu ruim', error)
    }
}

// const usuarioPromise = obterUsuario()

// usuarioPromise
//     .then((usuario) => {
//         return obterTelefone(usuario.id)
//             .then((resultado) => {
//                 return {
//                     usuario: {
//                         nome: usuario.nome,
//                         id: usuario.id
//                     },
//                     telefone: resultado
//                 }
//             })
//     })
//     .then((data) => {
//         const endereco = obterEnderecoAsync(data.usuario.id)
//         return endereco.then( (resultado) => {
//             return  {
//                 usuario: data.usuario,
//                 telefone: data.telefone,
//                 endereco: resultado
//             }
//         })
//     })
//     .then((data) => {
//         console.log(`
//             Nome: ${data.usuario.nome}
//             Endereco: ${data.endereco.rua}, ${data.endereco.numero}
//             Telefone: (${data.telefone.ddd}) ${data.telefone.telefone}
//         `)
//     })
//     .catch((error => {
//         console.log('Deu ruim', error)
//     }))