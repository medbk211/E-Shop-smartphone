
import api from '../../../api/axiosConfig'


// Ajouter un produit
export const addProduct = async (formData) => {
  return await api.post(`product/addProduct`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Récupérer tous les produits
export const getAllProducts = async () => {
  return await api.get(`product/getAllProducts`);
};

// Récupérer un produit par nom
export const getProductByName = async (title) => {
  return await api.get(`product/getProductByName/${title}`);
};

// Mettre à jour un produit
export const updateProduct = async (id, formData) => {
  return await api.put(`product/updateProduct/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// supprimer un produit 
export const deleteProduct = async (i)=>{
    return await api.delete(`product/deleteProduct/${i}`)
    
}
