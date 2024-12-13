import React from 'react'
// import ProductPage from './ProductPage'
import NewArrivals from '../componnet/NewArrivals'
import ProductCarousel from '../componnet/ProductCarousel'
import { Link } from 'react-router-dom'

export default function shop({ addToCart,addToFavoris }) {
    return (
        <div>

        
            <ProductCarousel addToCart={addToCart} addToFavoris={addToFavoris} />
            <NewArrivals />
            

        </div>
    )
}
