import React from "react";
import "../scss/components/button.scss";
function Button({ label, loading = false }) {
  return (
    <button
      className={loading ? "skel" : "P-btn"}
      style={{
        color: loading && "transparent",
        borderColor: loading && "transparent",
      }}
    >
      {label}
    </button>
  );
}

export default Button;
