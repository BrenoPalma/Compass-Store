import { renderHook, act } from "@testing-library/react";
import { useAuth } from "../../hooks/useAuth";
import { isAuthenticated, logout } from "../../services/authService";

jest.mock("../../services/authService");

describe("useAuth Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve retornar isLoggedIn como true quando o usuário está autenticado", () => {
    (isAuthenticated as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoggedIn).toBe(true);
  });

  it("deve retornar isLoggedIn como false quando o usuário não está autenticado", () => {
    (isAuthenticated as jest.Mock).mockReturnValue(false);

    const { result } = renderHook(() => useAuth());

    expect(result.current.isLoggedIn).toBe(false);
  });

  it("deve chamar logout e atualizar isLoggedIn para false ao chamar handleLogout", () => {
    (isAuthenticated as jest.Mock).mockReturnValue(true);

    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.handleLogout();
    });

    expect(logout).toHaveBeenCalledTimes(1);
    expect(result.current.isLoggedIn).toBe(false);
  });
});
