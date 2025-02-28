import api from "./api";

export interface CartProduct {
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  userId: number;
  date: string;
  products: CartProduct[];
}


export const getUserCarts = async(userId: string): Promise<Cart[]> =>{
    const response = await api.get(`/carts/user/${userId}`);
    return response.data;
}

export const getCartById = async (cartId: number): Promise<Cart> => {
  const response = await api.get(`/carts/${cartId}`);
  return response.data;
};

export const getAllCarts = async (): Promise<Cart[]> => {
  const response = await api.get(`/carts`);
  return response.data;
};

export const createCart = async (cart: Omit<Cart, "id">): Promise<Cart> => {
  const response = await api.post(`/carts`, cart);
  return response.data;
};

export const updateCart = async (cartId: number, products: CartProduct[]): Promise<Cart> => {
  const response = await api.put(`/carts/${cartId}`, {
    date: new Date().toISOString().split("T")[0],
    products,
  });
  return response.data;
};

export const deleteCart = async (cartId: string): Promise<void> => {
  await api.delete(`/carts/${cartId}`);
};

export const addToCart = async (userId: string, productId: string) => {
    try {
      const userCarts: Cart[] = await getUserCarts(userId);
      
      let cart = userCarts.length > 0 ? userCarts[userCarts.length - 1] : null;
  
      if (!cart) {
        const { data: newCart } = await api.post("/carts", {
          userId,
          date: new Date().toISOString(),
          products: [{ productId, quantity: 1 }]
        });
        return newCart;
      } else {
        const existingProduct = cart.products.find((p: CartProduct) => p.productId === productId);
  
        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          cart.products.push({ productId, quantity: 1 });
        }
  
        await api.put(`/carts/${cart.id}`, cart);
        return cart;
      }
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho", error);
      throw error;
    }
  };

