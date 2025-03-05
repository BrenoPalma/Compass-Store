import { renderHook, act, waitFor } from "@testing-library/react";
import { useProducts } from "../../hooks/useProducts";
import { getProducts, getProductsbyCategory } from "../../services/product";
import { Product } from "../../services/product";

jest.mock("../../services/product");

describe("useProducts Hook", () => {
  const mockProducts: Product[] = [
    {
      id: "1",
      title: "Produto A",
      price: 10,
      category: "eletronicos",
      description: "Descrição do Produto A",
      image: "https://via.placeholder.com/150",
      rating: { rate: 4.5, count: 10 },
    },
    {
      id: "2",
      title: "Produto B",
      price: 20,
      category: "vestuário",
      description: "Descrição do Produto B",
      image: "https://via.placeholder.com/150",
      rating: { rate: 3.8, count: 5 },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar todos os produtos corretamente", async () => {
    (getProducts as jest.Mock).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBe(null);
  });

  it("deve buscar produtos por categoria corretamente", async () => {
    (getProductsbyCategory as jest.Mock).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts("eletronicos"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBe(null);
  });

  it("deve lidar com erro ao buscar produtos", async () => {
    (getProducts as jest.Mock).mockRejectedValue(new Error("Erro ao buscar produtos"));

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe("Error: Erro ao buscar produtos");
  });
});
