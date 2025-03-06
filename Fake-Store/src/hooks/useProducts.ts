import {useState, useEffect} from 'react'
import { getProducts, getProductsbyCategory } from '../services/product'
import { Product } from '../services/product'

export const useProducts = (category?: string, limit?: number, sort?: string) =>{
    const [products,setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const data = category? await getProductsbyCategory(category,limit,sort) : await getProducts(limit,sort);
                setProducts(data);
            }catch(err){
                setError(""+err);
            }finally{
                setLoading(false);
            }
        };
        fetchProducts();
    },[limit,sort,category]);
    return{products,loading,error}
}