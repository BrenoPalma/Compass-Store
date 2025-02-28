import React from "react";
import { useProductById } from "../../../hooks/useProductById";
import { ProductCard } from "../../../components/ProductCard";

interface CartProductItemProps {
  productId: string;
  quantity: number;
}

const CartProductItem: React.FC<CartProductItemProps> = ({ productId, quantity }) => {
  const { product, loading, error } = useProductById(productId);

  if (loading) return <p>Carregando produto...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  return (
    <div>
    <ProductCard key={product.id} product={product} />
    <p>Quantidade: {quantity}</p>
    </div>
    
  );
};

export default CartProductItem;
