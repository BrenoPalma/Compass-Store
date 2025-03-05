import { renderHook, act, waitFor } from "@testing-library/react";
import { useUserCarts } from "../../hooks/useUserCarts";
import { getUserCarts } from "../../services/cart";
import { Cart } from "../../services/cart";

jest.mock("../../services/cart");

describe("useUserCarts Hook", () => {
  const mockUserId = "123";
  const mockCarts: Cart[] = [
    { id: "1", userId: 123, date: "2024-02-28", products: [{ productId: "abc", quantity: 2 }] },
    { id: "2", userId: 123, date: "2024-02-27", products: [{ productId: "xyz", quantity: 1 }] },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar os carrinhos do usuário e atualizar o estado corretamente", async () => {
    (getUserCarts as jest.Mock).mockResolvedValue(mockCarts);

    const { result } = renderHook(() => useUserCarts(mockUserId));

    expect(result.current.loading).toBe(true);
    expect(result.current.carts).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.carts).toEqual(mockCarts);
      expect(result.current.error).toBe(null);
    });
  });

  it("deve lidar com erro ao buscar os carrinhos", async () => {
    (getUserCarts as jest.Mock).mockRejectedValue(new Error("Erro ao buscar o carrinho"));

    const { result } = renderHook(() => useUserCarts(mockUserId));

    expect(result.current.loading).toBe(true);
    expect(result.current.carts).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.carts).toEqual([]);
      expect(result.current.error).toBe("Erro ao buscar o carrinho");
    });
  });

  it("não deve buscar os carrinhos se o userId estiver vazio", () => {
    renderHook(() => useUserCarts(""));

    expect(getUserCarts).not.toHaveBeenCalled();
  });
});
