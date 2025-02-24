import { useCategories } from "../hooks/useCategories";
import { CustomSelect } from "./CustomSelect";

export const CategorySelect = ({ onCategoryChange }: { onCategoryChange: (category: string) => void }) => {
  const { categories } = useCategories();

  const categoryOptions = [
    { label: "Todas", value: "" },
    ...categories.map((category) => ({ label: category, value: category }))
  ];

  return <CustomSelect label="Categoria" options={categoryOptions} onChange={onCategoryChange} />;
};
