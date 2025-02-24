import React from "react";
import "../styles/ProductCard.css"

import { Product } from "../../../services/product";

interface ProductCardProps{
    product: Product
}

export const ProductCard = ({product}: ProductCardProps) => {
    const renderStars = (rate: number) => {
        const fullStars = Math.floor(rate);
        const hasHalfStar = rate % 1 !== 0;
        const stars = [];
    
        for (let i = 0; i < fullStars; i++) {
          stars.push("★");
        }
    
        if (hasHalfStar) {
          stars.push("☆");
        }
    
        return stars.join("");
      };
    return (
        <div className="product-card">
            <img src={product.image} alt={product.title}/>
            <div>
            <h3>{product.title}</h3>
            <span>{renderStars(product.rating.rate)}</span>
            <span>({product.rating.count})</span>
            </div>
            <p>R$ {product.price}</p>
        </div>
    )
}