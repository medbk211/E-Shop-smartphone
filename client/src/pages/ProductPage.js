import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../componnet/ProductDetails';



const ProductPage = ({ addToCart }) => {
  const { id } = useParams();
  // const product = products.find((item) => item.id === parseInt(id));

  // if (!product) {
  //   return <div className="p-4 text-center">Produit introuvable</div>;
  // }

  // return (
  //   <div>
  //     <ProductDetails product={product} handleAddToCart={() => addToCart(product)} />
  //   </div>
  // );
};

export default ProductPage;