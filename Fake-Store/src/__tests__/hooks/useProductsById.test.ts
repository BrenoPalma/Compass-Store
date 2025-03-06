import { renderHook, waitFor } from "@testing-library/react";
import { useProductById } from "../../hooks/useProductById";
import { getProductById } from "../../services/product";
import { Product } from "../../services/product";

jest.mock("../../services/product");

describe("useProductById Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar um produto corretamente pelo ID", async () => {
    const mockProduct: Product = {
      id: "1",
      title: "Produto Teste",
      price: 150,
      category: "eletronicos",
      description: "Descrição do Produto Teste",
      image: "url_imagem_teste",
      rating: { rate: 4.7, count: 20 },
    };

    (getProductById as jest.Mock).mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useProductById("1"));

    expect(result.current.loading).toBe(true);
    expect(result.current.product).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.error).toBe(null);
  });

  it("deve lidar com erro ao buscar o produto", async () => {
    (getProductById as jest.Mock).mockRejectedValue(new Error("Produto não encontrado"));

    const { result } = renderHook(() => useProductById("1"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.product).toBe(null);
    expect(result.current.error).toBe("Error: Produto não encontrado");
  });
});
