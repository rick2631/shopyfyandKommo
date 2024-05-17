const express = require('express');
const router = express.Router();
const kommo = require('./kommo'); // Importa la función desde kommo.js
const kommopost = require('./Kommopost');
const { cartAbandonado } = require('./KommoCarrito')



router.get('/', (req, res) => {
    res.send("Hola desde el servidor");
});

router.post('/prueba', async (req, res) => {
    try {
        // Verificar si el cuerpo de la solicitud está presente
        if (!req.body) {
            throw new Error('El cuerpo de la solicitud está vacío');
        }

        // Desestructurar el cuerpo de la solicitud para obtener 'id' y 'email'
        const { id, email } = req.body;

        // Imprimir el cuerpo de la solicitud en la consola
        console.log(req.body);

        // Enviar una respuesta exitosa al cliente
        res.status(200).send('Solicitud POST recibida con éxito');
    } catch (error) {
        // Manejar errores
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/getdatas', async (req, res) => {
    try {
        const shopify = require('./shopify');
        const customers = await shopify.makeShopifyRequest('customers');
        const products = await shopify.makeShopifyRequest('products');
        // Agrega más solicitudes según sea necesario para otros datos

        // Combina los datos en un objeto de respuesta
        const responseData = {
            customers: customers.customers,
            products: products.products
            // Agrega más datos si es necesario
        };

        // Envía los datos como respuesta en formato JSON
        res.json(responseData);
    } catch (error) {
        console.error("Error al obtener la información de la tienda:", error);
        res.status(500).json({ error: "Error al obtener la información de la tienda" });
    }
});
router.post('/send-email', (req, res) => {
    const email = req.body.email; // Obtener la dirección de correo electrónico del cuerpo de la solicitud
    // Aquí puedes usar Axios u otra biblioteca para enviar el correo electrónico a Kommo
    console.log('Correo electrónico recibido:', email);
    // Aquí puedes agregar la lógica para enviar el correo electrónico a Kommo
    res.sendStatus(200); // Enviar una respuesta exitosa al cliente
  });
// solo me trae clientes 
router.get('/getcustomerdata', async (req, res) => { // Cambia el nombre de la ruta a algo que describa mejor lo que hace
    try {
        const shopify = require('./shopify');
        const customers = await shopify.makeShopifyRequest('customers');

        // Combina los datos en un objeto de respuesta
        const responseData = {
            customers: customers.customers
        };

        res.json(responseData); // Enviar la respuesta como JSON
    } catch (error) {
        console.error('Error al obtener datos de clientes:', error);
        res.status(500).send('Error al obtener datos de clientes'); // Manejar el error adecuadamente
    }
});
//prueba 

router.get('/getpotentialcustomers', async (req, res) => {
    try {
        const shopify = require('./shopify');
        const customers = await shopify.makeShopifyRequest('customers');

        // Accede al sessionID de la solicitud
        const sessionID = req.sessionID;

        // Simulamos un rastreo de clientes potenciales utilizando el sessionID
        // Puedes implementar tu lógica aquí para determinar quiénes son los clientes potenciales
        // Por ejemplo, podrías almacenar los sessionID de los usuarios que visitan ciertas páginas
        // y luego compararlos aquí para identificar a los posibles clientes.
        // En este ejemplo, simplemente devolvemos todos los clientes obtenidos de Shopify.
        const potentialCustomers = customers.customers;

        // Combina los datos en un objeto de respuesta
        const responseData = {
            potentialCustomers: potentialCustomers
        };

        res.json(responseData); // Enviar la respuesta como JSON
    } catch (error) {
        console.error('Error al obtener datos de posibles clientes:', error);
        res.status(500).send('Error al obtener datos de posibles clientes'); // Manejar el error adecuadamente
    }
});
router.post('/productvist', async (req, res) => {
    // Verificar si el cuerpo de la solicitud está presente
    if (!req.body) {
        res.status(400).send('El cuerpo de la solicitud está vacío');
    }
    try {
        const shopify = require('./shopify');

        const response = await shopify.makeShopifyRequest('products',`handle=${req.body.slug.replace('/products/',"")}`);

        const dbProduct = require('./guardarProductos');

        await dbProduct.guardarProducto(response.products[0]).then(result => {
            console.log(result)
        })
        
        // Enviar una respuesta exitosa al cliente
        res.status(200).send('Solicitud POST recibida con éxito');

    } catch (error) {
        // Manejar errores
        console.error(error);
        res.status(500).send('Error interno del servidor');
    }
});

// para guardar cliente potencial
// Ruta para manejar las solicitudes del Webhook de Shopify
/*router.post('/create-potential-customer', async (req, res) => {
    
    try {
      // Verificar si el productId está presente y tiene un valor definido
        if (!req.body.productId) {
            return res.status(400).json({ error: 'El ID del producto n está presente en la solicitud o es inválido' });
            
        }
        const Product = require('./models/Products'); 
        // Obtener la información del producto desde la base de datos
        const productId = req.body.productId; // Supongamos que recibes el ID del producto en el cuerpo de la solicitud
        const product = await Product.findOne({ where: { id: productId } });
        console.log(productId )
        
        // Verificar si el producto existe en la base de datos
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado en la base de datos' });
        }

        // Crear el cliente potencial utilizando la información del producto
        // Función para generar un ID único
function generateUniqueId() {
    // Genera un número aleatorio y lo convierte a una cadena hexadecimal
    return Math.random().toString(36).substr(2, 9);
}

// Crear cliente potencial
const potentialCustomer = {
    name: product.title, // Utiliza el título del producto como nombre del cliente potencial
    phoneNumber: req.body.phoneNumber, // Agrega el número de teléfono obtenido de la solicitud
    email: req.body.email, // Agrega el correo electrónico obtenido de la solicitud
    uniqueId: generateUniqueId() // Genera un ID único para el cliente potencial
    // Agrega más campos del cliente potencial si es necesario
};


        // Si deseas ver el cliente potencial, puedes imprimirlo en la consola
        console.log('Cliente potencial:', potentialCustomer);

        // Si no necesitas enviar datos a Kommo, puedes simplemente enviar una respuesta exitosa al cliente
        res.status(200).json({ message: 'Cliente potencial creado con éxito', data: potentialCustomer });
    } catch (error) {
        console.error('Error al crear cliente potencial:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});*/


router.post('/customers', async (req, res) => {    

 kommopost.addCustomers(req.body)
    res.status(200).json({ })});
    
// Ruta para obtener datos de la API de Kommo
router.get('/getKommoData', async (req, res) => {
    try {
        // Hacer la solicitud a la API de Kommo para obtener información de la cuenta
        const data = await kommo.makeKommoRequest('account', {
            con: 'amojo_id,amojo_rights,users_groups,task_types,version,entity_names,datetime_settings'
        });

        // Enviar la respuesta al cliente
        res.json(data);
    } catch (error) {
        console.error("Error al obtener información de la cuenta en Kommo:", error);
        res.status(500).json({ error: "Error al obtener información de la cuenta en Kommo" });
    }
    
});
router.post('/webhook', async (req, res) => {
    try {
        const { id, email, line_items, updated_at } = req.body;
        console.log(req.body);

        // Verificar si el checkout está abandonado
        const currentTime = new Date();
        const updatedTime = new Date(updated_at);
        const timeDifference = (currentTime - updatedTime) / 1000 / 60; // Diferencia en minutos

        // Considerar carrito abandonado si han pasado más de 30 minutos sin actualizarse
        if (timeDifference > 30) {
            const products = line_items.map(item => item.title).join(', ');

            // Enviar la información a Kommo (amoCRM)
            try {
                await cartAbandonado({
                    id,          // Mantén el id como string
                    email,       // Mantén el email como string
                    products,
                    updated_at,  // Mantén updated_at como string
                    first_name: 'Nombre', // Ajusta según los datos disponibles
                    last_name: 'Apellido'  // Ajusta según los datos disponibles
                });

                console.log('Prospecto creado en Kommo');
            } catch (error) {
                console.error('Error al crear el prospecto en Kommo:', error);
                return res.status(500).send('Error al crear el prospecto en Kommo');
            }
        }

        res.status(200).send('Webhook recibido');
    } catch (error) {
        console.error('Error al procesar el webhook:', error);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;
