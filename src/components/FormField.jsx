import React from "react";

const FormField = ({ label, type, value, f }) => {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <input
          type={type}
          placeholder={`Enter ${label}`}
          value={value}
          onChange={(e) => f(e.target.value)}
          className="input"
          required
        />
      </div>
    </div>
  );
};

export default FormField;
