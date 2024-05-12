
const Product = require('./models/Products');

function guardarProducto(producto) {
    // Verificar si el producto recibido está definido
    if (!producto) {
        throw new Error('El producto no está definido');
    }

    // Crear un nuevo objeto de Producto utilizando el modelo Sequelize
    Product.create({
        id: producto.id,
        title: producto.title,
        body_html: producto.body_html,
        vendor: producto.vendor,
        product_type: producto.product_type,
        created_at: producto.created_at,
        handle: producto.handle,
        updated_at: producto.updated_at,
        published_at: producto.published_at,
        template_suffix: producto.template_suffix,
        published_scope: producto.published_scope,
        tags: producto.tags,
        status: producto.status,id: producto.id,
        title: producto.title,
        body_html: producto.body_html,
        vendor: producto.vendor,
        product_type: producto.product_type,
        created_at: new Date(producto.created_at),
        handle: producto.handle,
        updated_at: new Date(producto.updated_at),
        published_at: new Date(producto.published_at),
       
        // Define más propiedades del producto si es necesario
    })
    .then((productoGuardado) => {
        console.log('Producto guardado exitosamente:', productoGuardado);
    })
    .catch((error) => {
        console.error('Error al guardar el producto:', error);
    });
}

module.exports = guardarProducto;
