// Importa la función guardarProducto desde tu archivo correspondiente
/*const { guardarProducto } = require('./guardarProductos');

// Importa el modelo de Producto de tu aplicación
const Product = require('./models/Products');

// Función para obtener un producto desde la base de datos
async function obtenerProductoDesdeBD(productId) {
    try {
        // Utiliza Sequelize para buscar el producto por su ID en la base de datos
        const producto = await Product.findByPk(productId);
        return producto; // Retorna el producto encontrado
    } catch (error) {
        console.error('Error al obtener el producto desde la base de datos:', error);
        throw error; // Lanza el error para que sea manejado fuera de esta función si es necesario
    }
}

// Ejemplo de cómo podrías usar la función guardarProducto con un producto de la base de datos
async function guardarProductoDesdeBD(productId) {
    try {
        // Obtén el producto desde la base de datos utilizando la función obtenerProductoDesdeBD
        const producto = await obtenerProductoDesdeBD(productId);
        
        // Verifica si se encontró el producto
        if (!producto) {
            throw new Error('El producto no se encontró en la base de datos');
        }

        // Llama a la función guardarProducto con los datos del producto
        const productoGuardadoId = await guardarProducto(producto);
        console.log(`Producto guardado en la base de datos con ID: ${productoGuardadoId}`);
    } catch (error) {
        console.error('Error al guardar el producto desde la base de datos:', error);
        throw error; // Lanza el error para que sea manejado fuera de esta función si es necesario
    }
}

// Ejemplo de uso de la función guardarProductoDesdeBD
const productId = 123; // ID del producto que deseas guardar desde la base de datos
guardarProductoDesdeBD(productId)
    .catch(error => {
        console.error('Error al guardar el producto desde la base de datos:', error);
    });*/
