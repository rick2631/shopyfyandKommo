/*const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo
// Luego le injectamos la conexión a Sequelize.
module.exports = (sequelize) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        line_items: {
            type: DataTypes.JSONB, // Esto puede variar dependiendo de la estructura de tus datos
            allowNull: true // Cambia a false si no puede ser nulo
        },
        note: {
            type: DataTypes.STRING, // Esto puede variar dependiendo de la longitud del texto
            allowNull: true // Cambia a false si no puede ser nulo
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });

    return Order;
};*/
