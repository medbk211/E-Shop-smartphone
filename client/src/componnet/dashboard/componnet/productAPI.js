import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/product'; // Remplacez par votre URL si besoin

// Ajouter un produit
export const addProduct = async (formData) => {
  return await axios.post(`${API_BASE_URL}/addProduct`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Récupérer tous les produits
export const getAllProducts = async () => {
  return await axios.get(`${API_BASE_URL}/getAllProducts`);
};

// Récupérer un produit par nom
export const getProductByName = async (title) => {
  return await axios.get(`${API_BASE_URL}/getProductByName/${title}`);
};

// Mettre à jour un produit
export const updateProduct = async (id, formData) => {
  return await axios.put(`${API_BASE_URL}/updateProduct/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// supprimer un produit 
export const deleteProduct = async (i)=>{
    return await axios.delete(`${API_BASE_URL}/deleteProduct/${i}`)
    
}
