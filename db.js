require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`, {
  logging: false,
  native: false,
});
/*const Customer = require('./models/Customers');
const Product = require('./models/Products');

// Define las relaciones entre los modelos
Product.belongsToMany(Customer, { through: 'ProductCustomer' });
Customer.belongsToMany(Product, { through: 'ProductCustomer' });*/


module.exports = {
  sequelize: sequelize,
};
