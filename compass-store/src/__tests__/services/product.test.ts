import { 
    getProducts,
    getProductById,
    getProductsbyCategory,
    getCategories,
    deleteProduct,
    addProduct,
    updateProduct,
    Product
  } from "../../services/product";
  import MockAdapter from "axios-mock-adapter";
  import api from "../../services/api";
  
  const mock = new MockAdapter(api);
  
  describe("Product Service", () => {
    afterEach(() => {
      mock.reset();
    });
  
    it("deve retornar a lista de produtos", async () => {
      const mockData = [{ id: "1", title: "Produto Teste", price: 100 }];
      mock.onGet("/products").reply(200, mockData);
      
      const products = await getProducts();
      expect(products).toEqual(mockData);
    });
  
    it("deve retornar um produto por ID", async () => {
      const mockData = { id: "1", title: "Produto Teste", price: 100 };
      mock.onGet("/products/1").reply(200, mockData);
      
      const product = await getProductById("1");
      expect(product).toEqual(mockData);
    });
  
    it("deve retornar produtos filtrados por categoria", async () => {
      const mockData = [{ id: "2", title: "Produto Categoria", price: 200 }];
      mock.onGet("/products/category/teste").reply(200, mockData);
      
      const products = await getProductsbyCategory("teste");
      expect(products).toEqual(mockData);
    });
  
    it("deve retornar a lista de categorias", async () => {
      const mockData = ["categoria1", "categoria2"];
      mock.onGet("/products/categories").reply(200, mockData);
      
      const categories = await getCategories();
      expect(categories).toEqual(mockData);
    });
    
    it("deve deletar um produto", async () => {
      const mockData = { id: "1", title: "Produto Deletado", price: 100 };
      mock.onDelete("/products/1").reply(200, mockData);
      
      const product = await deleteProduct(1);
      expect(product).toEqual(mockData);
    });

    const mockProduct: Product = {
        id: "1",
        title: "Produto Teste",
        price: 100,
        description: "Descrição do produto teste",
        category: "Categoria Teste",
        image: "https://example.com/product.jpg",
        rating: {
          rate: 4.5,
          count: 10,
        }
    }

    it("deve adicionar um produto", async () => {
        mock.onPost("/products").reply(201, mockProduct);
    
        const product = await addProduct(mockProduct);
    
        expect(product).toEqual(mockProduct);
      });
    
      it("deve atualizar um produto existente", async () => {
        const updatedProduct = { ...mockProduct, title: "Produto Atualizado" };
        mock.onPut(`/products/${mockProduct.id}`).reply(200, updatedProduct);
    
        const result = await updateProduct(Number(mockProduct.id), updatedProduct);
    
        expect(result).toEqual(updatedProduct);
      });
  });
  