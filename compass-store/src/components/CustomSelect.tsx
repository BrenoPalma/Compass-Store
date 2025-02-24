import "../styles/CustomSelect.css"
interface CustomSelectProps {
  label: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export const CustomSelect = ({ label, options, onChange }: CustomSelectProps) => {
  return (
    <div className="select-container">
      <label htmlFor={label}>{label}: </label>
      <select id={label} onChange={(e) => onChange(e.target.value)}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
