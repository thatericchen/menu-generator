import React, { useState } from "react";

const InputPage = () => {
  const [formData, setFormData] = useState({
    logo: "",
    items: "",
    pictures: "",
    slogan: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle form submission here, maybe send data to backend
    console.log(formData);
  };

  return (
    <div>
      <h1>Restaurant Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="logo">Logo URL:</label>
          <input
            type="text"
            id="logo"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="items">Items (comma separated):</label>
          <input
            type="text"
            id="items"
            name="items"
            value={formData.items}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="pictures">Pictures URLs (comma separated):</label>
          <input
            type="text"
            id="pictures"
            name="pictures"
            value={formData.pictures}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="slogan">Slogan:</label>
          <input
            type="text"
            id="slogan"
            name="slogan"
            value={formData.slogan}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputPage;
