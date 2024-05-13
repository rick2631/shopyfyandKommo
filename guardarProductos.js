
const Product = require('./models/Products');

async function guardarProducto(producto) {
    try {
        // Verifica si el producto ya existe en la base de datos
        const productoExistente = await Product.findOne({ where: { id: producto.id } });

        if (productoExistente) {
            console.log('El producto ya existe en la base de datos.');
            return productoExistente.id; // Retorna el ID del producto existente
        }

        // Si el producto no existe, créalo
        const productoGuardado = await Product.create({
            id: producto.id,
            title: producto.title,
            body_html: producto.body_html,
            vendor: producto.vendor,
            product_type: producto.product_type,
            created_at: new Date(producto.created_at),
            handle: producto.handle,
            updated_at: new Date(producto.updated_at),
            published_at: new Date(producto.published_at),
            template_suffix: producto.template_suffix,
            published_scope: producto.published_scope,
            tags: producto.tags,
            status: producto.status,
            // Define más propiedades del producto si es necesario
        });

        console.log('Producto guardado exitosamente');
        return productoGuardado.id; // Retorna el ID del producto guardado
    } catch (error) {
        console.error('Error al guardar el producto:', error);
        throw error; // Lanza el error para que sea manejado fuera de esta función si es necesario
    }
}

module.exports = { guardarProducto };