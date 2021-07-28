import React from "react";
import "../scss/components/button.scss";
function Button({ label }) {
  return <button className="P-btn">{label}</button>;
}

export default Button;
