const ICrud = require("./../interfaces/interfaceCrud");

class ContextStrategy extends ICrud {
  constructor(strategy) {
    super();
    this._database = strategy;
  }

  create(item) {
    return this._database.create(item);
  }

  read(item, skip, limit, sort) {
    //http://localhost:5000/heroes?skip=0&limit=10&nome=flash
    return this._database.read(item, skip, limit, sort);
  }

  buscar(item, skip, limit, sort) {
    //http://localhost:5000/heroes?skip=0&limit=10&nome=flash
    return this._database.buscar(item, skip, limit, sort);
  }

  update(id, item) {
    return this._database.update(id, item);
  }

  delete(id) {
    return this._database.delete(id);
  }

  isConnected() {
    return this._database.isConnected();
  }

  static connect() {
    return this._database.connect();
  }
}

module.exports = ContextStrategy;
