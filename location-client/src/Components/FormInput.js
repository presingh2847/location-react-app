import React, { useState } from "react";
import "./formInput.scss";

function TextInput(props) {
  const [inputType] = useState(props.type);
  const [inputValue, setInputValue] = useState();

  function handleChange(event) {
    if (props.onChange) props.onChange(event.target.value);
    setInputValue(event.target.value);
  }
  return (
    <>
      <input
        type={inputType}
        value={inputValue}
        name={props.name}
        onChange={handleChange}
        autoComplete="off"
        className="formInput"
      />
    </>
  );
}
export default TextInput;
