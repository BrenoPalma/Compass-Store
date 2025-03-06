import {useState} from "react";
import { login } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

export const LoginController = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setLoading(true);
        await login(username, password);
        navigate("/");
      } catch (error) {
        console.log(error);
        setError("Usuário ou senha inválidos!");
      }
      finally {
        setLoading(false);
      }
    };

    return {loading,error, handleSubmit, setUsername, setPassword}
}