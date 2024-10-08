import { Input } from "@ui5/webcomponents-react";

function BasicInput({ type, value, onChange, className, style }) {
  return (
    <Input
      type={type}
      value={value}
      onChange={onChange}
      className={className}
      style={style}
    />
  );
}

export default BasicInput;
