import { useState, useEffect } from "react";
import { useUserCarts } from "../../../hooks/useUserCarts";
import { deleteCart } from "../../../services/cart";
import { Cart } from "../../../services/cart";

export const useUserCartsController = () => {
  const { carts, loading, error } = useUserCarts("3"); // O ID do usuário pode vir do contexto
  const [userCarts, setUserCarts] = useState<Cart[]>([]);

  useEffect(() => {
    setUserCarts(carts);
  }, [carts]);

  const handleDeleteCart = async (cartId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este carrinho?")) return;

    try {
      await deleteCart(cartId);
      setUserCarts(userCarts.filter(cart => cart.id !== cartId));
    } catch (error) {
      console.error("Erro ao excluir o carrinho:", error);
      alert("Erro ao excluir o carrinho!");
    }
  };

  return { userCarts, loading, error, handleDeleteCart };
};
