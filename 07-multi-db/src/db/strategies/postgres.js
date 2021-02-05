const IContextStrategy = require('./interface/IContextStrategy')

class Postgres extends IContextStrategy {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo no Postgres')
    }
}

module.exports = Postgres