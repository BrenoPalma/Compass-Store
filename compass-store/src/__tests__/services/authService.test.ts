import { login, logout, isAuthenticated } from "../../services/authService";
import MockAdapter from "axios-mock-adapter";
import api from "../../services/api";

const mock = new MockAdapter(api);

describe("Auth Service", () => {
  const mockToken = "fake-jwt-token";
  const mockCredentials = { username: "testUser", password: "testPassword" };

  beforeEach(() => {
    localStorage.clear();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    mock.reset();
  });

  it("deve fazer login e armazenar o token", async () => {
    mock.onPost("/auth/login").reply(200, { token: mockToken });

    const token = await login(mockCredentials.username, mockCredentials.password);

    expect(token).toBe(mockToken);
    expect(localStorage.getItem("token")).toBe(mockToken);
  });

  it("deve falhar ao tentar logar com credenciais inválidas", async () => {
    mock.onPost("/auth/login").reply(401, { message: "Invalid credentials" });

    await expect(login("wrongUser", "wrongPassword")).rejects.toThrow();
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("deve remover o token ao fazer logout", () => {
    localStorage.setItem("token", mockToken);
    logout();
    expect(localStorage.getItem("token")).toBeNull();
  });

  it("deve verificar se o usuário está autenticado", () => {
    localStorage.setItem("token", mockToken);
    expect(isAuthenticated()).toBe(true);
    
    localStorage.removeItem("token");
    expect(isAuthenticated()).toBe(false);
  });
});
