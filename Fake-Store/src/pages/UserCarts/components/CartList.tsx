import React, { useState } from "react";
import { Cart } from "../../../services/cart";
import CartProductItem from "./ProductCardItem";

interface CartListProps {
  carts: Cart[];
  onCartDeleted: (cartId: string) => void;
}

const CartList: React.FC<CartListProps> = ({ carts, onCartDeleted }) => {
  const [loadingCart, setLoadingCart] = useState<string | null>(null);

  return (
    <ul>
      {carts.map((cart) => (
        <li key={cart.id}>
          <strong>Carrinho ID:</strong> {cart.id} <br />
          <strong>Data:</strong> {new Date(cart.date).toLocaleDateString()} <br />
          <strong>Produtos:</strong>
          <ul>
            {cart.products.map((product) => (
              <CartProductItem key={product.productId} productId={product.productId} quantity={product.quantity} />
            ))}
          </ul>
          <button
            onClick={() => {
              setLoadingCart(cart.id);
              onCartDeleted(cart.id);
            }}
            disabled={loadingCart === cart.id}
            style={{ marginTop: "10px", backgroundColor: "red", color: "white", padding: "5px 10px" }}
          >
            {loadingCart === cart.id ? "Excluindo..." : "Excluir Carrinho"}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CartList;
