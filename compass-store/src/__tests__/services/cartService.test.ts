import { 
    getUserCarts, 
    getCartById, 
    getAllCarts, 
    createCart, 
    updateCart, 
    deleteCart, 
    addToCart 
  } from "../../services/cart";
  import MockAdapter from "axios-mock-adapter";
  import api from "../../services/api";
  
  const mock = new MockAdapter(api);
  
  describe("Cart Service", () => {
    afterEach(() => {
      mock.reset();
    });
  
    it("deve retornar os carrinhos do usuário", async () => {
      mock.onGet("/carts/user/3").reply(200, [{ id: "1", userId: 3, date: "2024-02-28", products: [] }]);
      const carts = await getUserCarts("3");
      expect(carts.length).toBe(1);
      expect(carts[0].userId).toBe(3);
    });
  
    it("deve retornar um carrinho pelo ID", async () => {
      mock.onGet("/carts/1").reply(200, { id: "1", userId: 3, date: "2024-02-28", products: [] });
      const cart = await getCartById(1);
      expect(cart.id).toBe("1");
    });
  
    it("deve retornar todos os carrinhos", async () => {
      mock.onGet("/carts").reply(200, [{ id: "1", userId: 3, date: "2024-02-28", products: [] }]);
      const carts = await getAllCarts();
      expect(carts.length).toBe(1);
    });
  
    it("deve criar um novo carrinho", async () => {
      const newCart = { userId: 3, date: "2024-02-28", products: [] };
      mock.onPost("/carts").reply(201, { id: "1", ...newCart });
      const cart = await createCart(newCart);
      expect(cart.id).toBe("1");
    });
  
    it("deve atualizar um carrinho", async () => {
      const updatedCart = { id: "1", date: "2024-02-28", products: [{ productId: "101", quantity: 2 }] };
      mock.onPut("/carts/1").reply(200, updatedCart);
      const cart = await updateCart(1, updatedCart.products);
      expect(cart.products.length).toBe(1);
      expect(cart.products[0].quantity).toBe(2);
    });
  
    it("deve deletar um carrinho", async () => {
      mock.onDelete("/carts/1").reply(204);
      await expect(deleteCart("1")).resolves.toBeUndefined();
    });
  
    it("deve adicionar um produto ao carrinho", async () => {
      mock.onGet("/carts/user/3").reply(200, []);
      mock.onPost("/carts").reply(201, { id: "1", userId: 3, date: "2024-02-28", products: [{ productId: "101", quantity: 1 }] });
      const cart = await addToCart("3", "101");
      expect(cart.products.length).toBe(1);
      expect(cart.products[0].productId).toBe("101");
    });
  });
  