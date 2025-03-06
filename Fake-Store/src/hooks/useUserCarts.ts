import { useState, useEffect } from "react";
import { Cart, getUserCarts } from "../services/cart";

export const useUserCarts = (userId: string) => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const data = await getUserCarts(userId);
        setCarts(data);
        setError(null);
      } catch (err) {
        setError("Erro ao buscar o carrinho");
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  return { carts, loading, error};
};
