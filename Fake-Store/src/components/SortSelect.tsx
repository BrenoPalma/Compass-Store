import { CustomSelect } from "./CustomSelect";
export const SortSelect = ({ onSortChange }: { onSortChange: (sort: string) => void }) => {
    const sortOptions = [
      { label: "Crescente", value: "asc" },
      { label: "Decrescente", value: "desc" }
    ];
  
    return <CustomSelect label="Ordenação" options={sortOptions} onChange={onSortChange} />;
  };
  