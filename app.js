const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { sequelize } = require('./db'); // Importar la conexión Sequelize
const routes = require('./routes');
const Product = require('./models/Products');
const Customer = require('./models/Customers')

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
Promise.all([
  Product.sync({ force: false }),
  Customer.sync({ force: false })
])
.then(() => {
  console.log('Modelos sincronizados con la base de datos.');
  // Continuar con otras operaciones después de sincronizar los modelos
})
.catch(error => {
  console.error('Error al sincronizar los modelos con la base de datos:', error);
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});