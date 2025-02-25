import { LoginController } from "../controller/LoginController";

export const LoginView = () => {
  const {loading, error, handleSubmit, setUsername, setPassword} = LoginController();
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
        {loading ? "Entrando..." : "Login"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
