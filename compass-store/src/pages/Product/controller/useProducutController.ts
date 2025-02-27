import { useProductById } from "../../../hooks/useProductById";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const useProductController = () => {
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);
    
    const isValidId = Boolean(id);
    console.log("id:",id);
    const { product, loading, error } = useProductById(id ?? "");
    return isValidId 
    ? { product, loading, error } 
    : { product: null, loading: false, error: "ID inválido" };
};