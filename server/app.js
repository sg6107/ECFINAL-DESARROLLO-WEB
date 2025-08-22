const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
 
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reservas', require('./routes/reservaRoutes'));
app.use('/api/servicios', require('./routes/servicioRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
    res.send('Servidor del Consultorio corriendo...');
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
