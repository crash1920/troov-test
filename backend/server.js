const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware pour parser le JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('🟢 Connecté à MongoDB Atlas'))
.catch(err => console.log('🔴 Erreur de connexion MongoDB Atlas :', err));

// Route de test
app.get('/', (req, res) => {
  res.send('API opérationnelle et connectée à MongoDB Atlas');
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});
