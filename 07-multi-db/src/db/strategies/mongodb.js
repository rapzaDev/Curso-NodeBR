const IContextStrategy = require("./interface/IContextStrategy")

class MongoDB extends IContextStrategy {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo no MongoDB')
    }
}

module.exports = MongoDB