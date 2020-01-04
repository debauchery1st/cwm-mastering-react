import React from "react";

const Select = ({ options: choices, onChange: liftUp, ...rest }) => {
  !Object.keys(rest).includes("className") &&
    (rest.className = "form-group custom-select");
  const renderOption = (text, idx) => (
    <option key={idx} value={idx}>
      {text}
    </option>
  );
  const opts = choices.map((t, i) => renderOption(t, i));
  const onChange = e => {
    liftUp(choices[e.currentTarget.value]);
  };
  return (
    <select {...rest} onChange={onChange}>
      {opts}
    </select>
  );
};

export default Select;
