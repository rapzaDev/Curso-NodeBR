const IContextStrategy = require('../interface/IContextStrategy')

class ContextStrategy extends IContextStrategy {
    constructor(strategy) {
        super()
        this._database = strategy
    }

    create(item) {
        return this._database.create()
    }

    read(item) {
        return this._database.read()
    }

    update(id, item) {
        return this._database.update(id, item)
    }

    delete(id){
        return this._database.delete(id)
    }
}

module.exports = ContextStrategy