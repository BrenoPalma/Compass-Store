import { renderHook, act, waitFor } from "@testing-library/react";
import { useCategories } from "../../hooks/useCategories";
import { getCategories } from "../../services/product";

jest.mock("../../services/product");

describe("useCategories Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar categorias corretamente", async () => {
    const mockCategories = ["eletronicos", "vestuário", "livros"];
    (getCategories as jest.Mock).mockResolvedValue(mockCategories);

    const { result } = renderHook(() => useCategories());

    expect(result.current.loading).toBe(true);
    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.categories).toEqual(mockCategories);
    expect(result.current.error).toBe(null);
  });

  it("deve lidar com erro ao buscar categorias", async () => {
    (getCategories as jest.Mock).mockRejectedValue(new Error("Erro ao buscar categorias"));

    const { result } = renderHook(() => useCategories());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBe("Error: Erro ao buscar categorias");
  });
});
