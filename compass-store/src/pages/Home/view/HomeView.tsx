import { ProductList } from "../components/ProductList";
import { useHomeController } from "../controller/useHomeController";
import { CategorySelect } from "../../../components/CategorySelect";
import { SortSelect } from "../../../components/SortSelect";
import "../styles/SelectContainer.css"
const HomeView = () => {
    const {products, loading, error, setCategory, setSort} = useHomeController();
    return(
        <div>
            <div>
                <div className="selectdiv">
                    <CategorySelect onCategoryChange={setCategory}/>
                    <SortSelect onSortChange={setSort}/>
                </div>
            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error}</p>}
            <ProductList products={products} />
            </div>
        </div>

    )
}

export default HomeView;