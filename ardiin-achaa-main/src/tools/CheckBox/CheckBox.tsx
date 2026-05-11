// @ts-nocheck
import React from "react";


const CheckBox = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <Checkbox label="" value={checked} onChange={handleChange} />
    </div>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <div className="checkbox">
      <input  className="checkbox-input" type="checkbox" checked={value} onChange={onChange} />
      {label}
    </div>
  );
};

export default CheckBox;
