const InputField = ({ id, name, value, type, placeholder, onChange, label }) => {
  return (
    <div key={id}>
      {label && <label>{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default InputField;
