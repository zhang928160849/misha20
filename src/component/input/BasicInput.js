import { Input } from "@ui5/webcomponents-react";

function BasicInput({ type, value, onChange, className, style, valueState }) {
  return (
    <Input
      type={type}
      value={value}
      onChange={onChange}
      className={className}
      style={style}
      valueState={valueState}
    />
  );
}

export default BasicInput;
