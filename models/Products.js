const { DataTypes } = require('sequelize');

const db = require('./../db');

const Product = db.sequelize.define('Product', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body_html: {
    type: DataTypes.TEXT
  },
  vendor: {
    type: DataTypes.STRING
  },
  product_type: {
    type: DataTypes.STRING
  },
  created_at: {
    type: DataTypes.DATE
  },
  handle: {
    type: DataTypes.STRING,
    unique: true
  },
  updated_at: {
    type: DataTypes.DATE
  },
  published_at: {
    type: DataTypes.DATE
  },
  template_suffix: {
    type: DataTypes.STRING
  },
  published_scope: {
    type: DataTypes.STRING
  },
  tags: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  }
});

module.exports = Product
