const Product = require('../models/produit'); // Modèle Mongoose
const fs = require('fs/promises'); // Utilisation de la version promesse de fs
const path = require('path');
const Joi = require('joi'); // Pour la validation des données

// Définir l'URL de base pour les images
const BASE_IMAGE_URL = 'https://back-end-fehk.onrender.com/uploads/';

// Schéma de validation avec Joi
const productSchema = Joi.object({
  title: Joi.string().required(),
  brand: Joi.string().required(),
  description: Joi.string().required(),
  originalPrice: Joi.number().positive().required(),
  discountedPrice: Joi.number().positive().optional(),
  promotion: Joi.boolean().optional(),
});

// Ajouter un produit
exports.addProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);

    // Validation des champs obligatoires
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Une image est obligatoire.' });
    }

    const { title, brand, description, originalPrice, discountedPrice, promotion } = req.body;

    // Création du produit
    const product = new Product({
      image: `${BASE_IMAGE_URL}${req.file.filename}`,
      title,
      brand,
      description,
      originalPrice,
      discountedPrice,
      promotion: promotion || false,
    });

    // Sauvegarde du produit
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};

// Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};

// Récupérer un produit par son titre
exports.getProductByName = async (req, res) => {
  try {
    const product = await Product.findOne({ title: req.params.title });
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};

// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body, { allowUnknown: true });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    // Mise à jour de l'image si elle est présente
    if (req.file) {
      product.image = `${BASE_IMAGE_URL}${req.file.filename}`;
    }

    // Mise à jour des autres champs
    Object.assign(product, req.body);

    // Sauvegarde des modifications
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    // Suppression de l'image associée
    if (product.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', path.basename(product.image));
      try {
        await fs.unlink(imagePath); // Suppression asynchrone
        console.log(`Image ${imagePath} supprimée`);
      } catch (err) {
        console.warn(`Impossible de supprimer l'image ${imagePath}: ${err.message}`);
      }
    }

    // Suppression du produit
    await product.deleteOne();
    res.json({ message: 'Produit supprimé avec succès.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur, veuillez réessayer plus tard.' });
  }
};
