// @ts-nocheck
import React from "react";

type InputProps = {
  id?: string;
  icon?: React.ReactNode;
  name?: string;
  about?: string;
  placeholder?: string;
  value?: string | number;
  type?: string;
  min?: string | number;
  max?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  validation?: boolean;
  disabled?: boolean;
};

const Input = ({
  id,
  icon,
  name,
  about,
  placeholder,
  value,
  type,
  min,
  max,
  onChange,
  required,
  validation,
  disabled,
}: InputProps) => {
  return (
    <div className="myInput" about={about}>
      {icon}

      <input
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        type={type}
        min={min}
        max={max}
        onChange={onChange}
        required={required}
        disabled={disabled}
        style={icon ? { paddingLeft: 30 } : {}}
      />

      {validation && <p>Буруу байна</p>}
    </div>
  );
};

export default Input;
