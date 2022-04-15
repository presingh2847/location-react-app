// ./components/Button.js
import React, { useState } from "react";
import "./button.scss";
function Button(props) {
  const [size] = useState(props.size);
  const [variant] = useState(props.variant);
  return (
    <button
      disabled={props.disabled}
      className={`btn btn-${variant} btn-${size}`}
      onClick={props.onClick}
    >
      {props.children}{" "}
    </button>
  );
}
export default Button;
