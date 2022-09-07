const mongoose = require("mongoose");
const config = require("./config");
const uriString = config.uriString;
// Notese que esta clase es agnóstica a la collecion que se usará

class ContenedorMongo {
  constructor (model) {
    // URI string mongodb
    this.uriString = uriString;
    // Model hace referencia a un Modelo de Mongoose pasado como 
    // argumento al constructor 
    this.Model = model;
    // Nombre de la coleccion un string
    if (this.Model) {
      this.collection = this.Model.modelName;
    }
  }

  async connect () {
    // Este metodo debe llamarse al inicializar el DAO
    // usar try..catch
    try {
      return await mongoose.connect(this.uriString);
    } catch (err) {
      throw new Error(`ERROR DE CONEXION + ${err}`)
    }
  }

  // Crear un nuevo documento en la coleccion
  async save(object) {
    try {
      const document = new this.Model(object); 
      const result = await document.save();
      return result; // return -> _id + campos del documento
    } catch (err) {
      throw new Error(`MongoContainer: ERROR AL GUARDAR: ${err}`);
    }
  }
  // updateById
  // deleteById
  // getAll
  // getById
}

module.exports = ContenedorMongo;