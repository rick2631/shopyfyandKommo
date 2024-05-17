
const { DataTypes } = require('sequelize');

const db = require('./../db');// Importa tu instancia de Sequelize desde el archivo db.js

const Customer = db.sequelize.define('Customer', {
  // Define las propiedades de tu modelo Customers
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    unique: true
  }
});

module.exports = Customer;
