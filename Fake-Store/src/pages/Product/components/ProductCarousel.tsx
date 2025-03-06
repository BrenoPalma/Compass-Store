import React from "react";
import { useProducts } from "../../../hooks/useProducts";
import { ProductCard } from "../../../components/ProductCard";
import "../styles/Carousel.css"

interface ProductCarouselProps {
    category: string;
}

export const ProductCarousel = ({ category }: ProductCarouselProps) => {
    const { products, loading, error } = useProducts(category);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar produtos.</p>;

    return (
        <div className="carousel-container">
            <h2>Mais produtos em "{category}"</h2>
            <div className="carousel">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};
