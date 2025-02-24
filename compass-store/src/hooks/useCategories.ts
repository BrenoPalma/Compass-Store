import {useState, useEffect} from 'react'
import { getCategories } from '../services/product'

export const useCategories = () =>{
    const [categories,setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const data = await getCategories();
                setCategories(data);
            }catch(err){
                setError(""+err);
            }finally{
                setLoading(false);
            }
        };
        fetchCategories();
    },[]);
    return{categories,loading,error}
}