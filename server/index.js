require('dotenv').config(); // Charger les variables d'environnement depuis .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Importer les routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const usersRoutes = require('./routes/usersRoutes'); // Correction ici

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Corrigé : placé au bon endroit pour traiter les JSON entrants
app.use(bodyParser.urlencoded({ extended: true })); // Pour traiter les formulaires encodés en URL

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connecté à MongoDB'))
  .catch((error) => console.error('Erreur de connexion à MongoDB:', error));

// Vérifier et créer le dossier 'uploads' si nécessaire
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/users', usersRoutes);
app.use('/uploads', express.static(uploadDir));

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));
