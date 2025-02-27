import React from "react";
import "../styles/ProductInfo.css";
import { Product } from "../../../services/product";

interface ProductInfoProps {
    product: Product | null;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
    if (!product) {
        return <p className="error-message">Produto não encontrado.</p>;
    }

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
        <div className="product-container">
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="product-details">
                    <h3 className="product-title">{product.title}</h3>
                    <div className="product-rating">
                        <span className="stars">{renderStars(product.rating?.rate || 0)}</span>
                        <span className="review-count">({product.rating?.count || 0} avaliações)</span>
                    </div>
                    <p className="product-price">R$ {product.price.toFixed(2)}</p>
                    <p className="product-description">{product.description}</p>
                    <button className="button">Comprar</button>
                </div>
        </div>
    );
};
