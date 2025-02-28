import api from "./api";

export interface Product{
    id: string,
    title:string,
    price:number,
    description:string,
    category:string,
    image:string,
    rating:{
        rate:number,
        count:number
    }
}

export const getProducts = async(limit?:number, sort?: string): Promise<Product[]> =>{
    let url = "/products"
    if(limit) url += `?limit=${limit}`
    if(sort) url += limit? `&sort=${sort}` : `?sort=${sort}`
    const response = await api.get(url);
    return response.data;
};

export const getProductById = async(id:string): Promise<Product> =>{
    const response = await api.get(`/products/${id}`);
    return response.data;
}

export const getProductsbyCategory = async(category:string,limit?:number, sort?: string): Promise<Product[]> =>{
    let url = `/products/category/${category}`;
    if(limit) url += `?limit=${limit}`
    if(sort) url += limit? `&sort=${sort}` : `?sort=${sort}`
    const response = await api.get(url);
    return response.data;
}

export const getCategories = async(): Promise<string[]> =>{
    const response = await api.get(`/products/categories`);
    return response.data;
}

export const addProduct = async(product:Product): Promise<Product> => {
    const response = await api.post("/products",product);
    return response.data;
}

export const updateProduct = async(id:number,product:Product): Promise<Product> => {
    const response = await api.put(`/products/${id}`,product);
    return response.data;
}

export const deleteProduct = async(id:number): Promise<Product> => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
}
