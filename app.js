const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { conn } = require('./db'); // Importar la conexión Sequelize
const routes = require('./routes');

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
conn.sync({ force: false }) // force: false para no eliminar y recrear las tablas en cada reinicio del servidor
  .then(() => {
    console.log('Modelo sincronizado con la base de datos.');
    // Iniciar el servidor después de sincronizar el modelo
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error al sincronizar el modelo con la base de datos:', error);
  });
