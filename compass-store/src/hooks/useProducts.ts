import {useState, useEffect} from 'react'
import { getProducts } from '../services/product'
import { Product } from '../services/product'

export const useProducts = (limit?: number, sort?: "asc" | "desc") =>{
    const [products,setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const data = await getProducts(limit,sort);
                setProducts(data);
            }catch(err){
                setError(""+err);
            }finally{
                setLoading(false);
            }
        };
        fetchProducts();
    },[limit,sort]);
    return{products,loading,error}
}