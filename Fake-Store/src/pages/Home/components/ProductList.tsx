import { Product } from "../../../services/product";
import { ProductCard } from "../../../components/ProductCard";
import "../styles/ProductList.css"
type Props = {
    products: Product[];
};

export const ProductList = ({products}: Props) => {
    return(
        <div className="products-grid">
            {products.map((product) =>(
                <ProductCard key={product.id} product={product}></ProductCard>
                   
            ))}
        </div>
    );
}