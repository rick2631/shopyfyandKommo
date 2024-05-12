const express = require('express');
const router = express.Router();
const kommo = require('./kommo'); // Importa la función desde kommo.js
const kommopost = require('./Kommopost');

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
    try {

        const shopify = require('./shopify');
        const products = await shopify.makeShopifyRequest('products',`handle=${req.body.slug.replace('/products/',"")}`);
        console.log(products);
        // Verificar si el cuerpo de la solicitud está presente
        if (!req.body) {
            throw new Error('El cuerpo de la solicitud está vacío');
        }


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




//Ruta para trabajar Webhook customers 
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


module.exports = router;
