require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/webhook`, {
  logging: false,
  native: false,
});

// Cargar el modelo Product
const ProductModelPath = path.join(__dirname, 'models', 'Products.js'); // Ruta al archivo de tu modelo Product
const products = require(ProductModelPath)(sequelize); // Inyectar la conexión a Sequelize en el modelo Product

module.exports = {
  conn: sequelize,
  products: products,
};
