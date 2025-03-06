import React from "react";
import { useUserCartsController } from "../controller/useUserCartsController";
import CartList from "../components/CartList";

const UserCartsView = () => {
  const { userCarts, loading, error, handleDeleteCart } = useUserCartsController();

  if (loading) return <p>Carregando carrinhos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Meus Carrinhos</h2>
      {userCarts.length > 0 ? (
        <CartList carts={userCarts} onCartDeleted={handleDeleteCart} />
      ) : (
        <p>Nenhum carrinho encontrado.</p>
      )}
    </div>
  );
};

export default UserCartsView;
