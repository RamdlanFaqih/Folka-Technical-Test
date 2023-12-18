import React from "react";

export const FormInput = ({ type, placeholder, name, value, onChange }) => {
  return (
    <>
      <div className="w-full">
        <div className="w-full mb-5">
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full text-dark p-3 rounded-md border drop-shadow-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-secondary"
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  );
};
