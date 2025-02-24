import {useState} from "react";
import { useProducts } from "../../../hooks/useProducts";

export const useHomeController = () => {
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<string>("asc");

    const {products,loading,error} = useProducts(category,undefined,sort)
    return {products,loading,error,setCategory,setSort};
}