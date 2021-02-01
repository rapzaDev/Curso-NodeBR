function obterUsuario (callback) {
    setTimeout(() => {
        return callback(null,{
            id: 1,
            nome: 'Aladin',
            dataNascimento : new Date()
        })
    }, 1000)
}

function obterTelefone (userId, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '96000067',
            ddd: 79
        })
    }, 2000)
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
// const telefone = obterTelefone(usuario.id)
// const endereco = obterEndereco(usuario.id)

// console.log('telefone', telefone)