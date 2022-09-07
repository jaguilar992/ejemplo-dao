const ContenedorMongo = require("./contenedor.mongo");
const Carrito = require("./carrito.schema");

class CarritoDAO extends ContenedorMongo {
  constructor(Model) {
    super(Model); // Inicializamos la clase padre -> Contenedor
    this.connect().catch(err => {
      throw new Error(`ERROR INICIALIZACION DAO ${err}`)
    });
  }
}

const carritoDAO = new CarritoDAO(Carrito);
// Exportamos una instancia de esta clase

module.exports = carritoDAO;

// Clase accesoria
// Hereda los metodos para gestionar la coleccion
// Create
// Read
// Update
// Delete