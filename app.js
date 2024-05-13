const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { sequelize } = require('./db'); // Importar la conexión Sequelize
const routes = require('./routes');
const Product = require('./models/Products');

require('dotenv').config();
const PORT = process.env.PORT || 3001;

const app = express();

app.use(session({
    secret: 'mySecretKey', // Se utiliza para firmar el ID de la sesión cookie
    resave: false,
    saveUninitialized: true
}));
app.use(cors());
app.use(express.json());
app.use('/', routes);

// Sincronizar el modelo con la base de datos
Product.sync({ force: false }) // force: false para no eliminar y recrear las tablas en cada reinicio del servidor
  .then(() => {
    console.log('Modelo sincronizado con la base de datos.');
    // Iniciar el servidor después de sincronizar el modelo
    
  })
  .catch(error => {
    console.error('Error al sincronizar el modelo con la base de datos:', error);
  });

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});