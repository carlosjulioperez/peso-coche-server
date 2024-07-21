const express = require('express');
const dotenv = require('dotenv');
const pool = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRoutes = require('./routes/login.route');
const salidaLimpiezaRoutes = require('./routes/salida_limpieza.route');
const transferenciaRoutes = require('./routes/transferencia.route');
const nuevoRoutes = require('./routes/nuevo.route');
const pesajeRoutes = require('./routes/pesaje.route');
const asignacionRoutes = require('./routes/asignacion.route');
const taraRoutes = require('./routes/tara.route');

dotenv.config();
// require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW()');
    res.send(result.rows[0]);
    // res.json({ info: 'Node.js, Express, and Postgres API' })
    console.log(res);
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  } finally {
    client.release(); // Release the client connection
  }
});

// app.get('/', (req, res) => {
//   //res.send('Hello, World!');
//   res.json({ info: 'Node.js, Express, and Postgres API' });
// });

// Create a router for API routes
const apiRouter = express.Router();
// Endpoints
apiRouter.use(loginRoutes);
apiRouter.use(salidaLimpiezaRoutes);
apiRouter.use(transferenciaRoutes);
apiRouter.use(nuevoRoutes)
apiRouter.use(pesajeRoutes)
apiRouter.use(asignacionRoutes)
apiRouter.use(taraRoutes);

app.use('/api', apiRouter);
// app.use(apiRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
