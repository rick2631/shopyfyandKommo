const request = require('request');
const guardarProducto = require('./guardarProductos');
require('dotenv').config();

let apiKey = process.env.SHOPIFY_API_KEY;
let password = process.env.SHOPIFY_PASSWORD;
let version = '2022-10';
let shopName = 'ecopanama'; // Aquí coloca el nombre de tu tienda Shopify

// Función para realizar la solicitud a la API de Shopify
function makeShopifyRequest(endpoint, params = "") {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'GET',
            url: `https://${apiKey}:${password}@${shopName}.myshopify.com/admin/api/${version}/${endpoint}.json?${params}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }
            if (response.statusCode !== 200) {
                reject(`Error en la respuesta de la API de Shopify (${response.statusCode}): ${body}`);
                return;
            }
            resolve(JSON.parse(body));
        });
    });
}

// Llamar a la función makeShopifyRequest para obtener los productos
makeShopifyRequest('products')
    .then((data) => {
        if (data && data.products && data.products.length > 0) {
            const primerProducto = data.products[0];
            guardarProducto(primerProducto);
        } else {
            throw new Error('No se encontraron productos en la respuesta de la API de Shopify.');
        }
    })
    .catch((error) => {
        console.error('Error al obtener o procesar datos de la API de Shopify:', error);
    });


module.exports = {
    makeShopifyRequest: makeShopifyRequest
};
