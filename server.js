const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conectar a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',    // Dirección de tu servidor de MySQL
  user: 'root',         // Tu usuario de MySQL
  password: '', // Tu contraseña de MySQL
  database: 'proyecto_db'      // Nombre de la base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
  } else {
    console.log('Conectado a MySQL');
  }
});

// Endpoint para el login
app.post('/login', (req, res) => {
  const { Correo, Contraseña} = req.body;

  const query = 'SELECT * FROM usuarios WHERE Correo = ? AND Constraseña = ?';
  db.query(query, [Correo, Contraseña], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error en la consulta de la base de datos' });
    } else if (results.length > 0) {
      res.status(200).json({ message: 'Login exitoso', user: results[0] });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
