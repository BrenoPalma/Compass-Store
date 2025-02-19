import {useState, useEffect} from 'react'
import { getProductById } from '../services/product'
import { Product } from '../services/product'

export const useProductById = (id:number) =>{
    const [product,setProduct] = useState<Product>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                const data = await getProductById(id);
                setProduct(data);
            }catch(err){
                setError(""+err);
            }finally{
                setLoading(false);
            }
        };
        fetchProduct();
    },[id]);
    return{product,loading,error}
}