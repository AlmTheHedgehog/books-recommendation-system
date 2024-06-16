import React, { useState } from "react";

const Searchform = ({ searchText }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchText(text);
  };

  const onChangevalue = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <div>
      <br />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Enter your search term"
          onChange={onChangevalue}
        />
        <button
          style={{
            marginLeft: "1rem",
            transition: "all 0.3s ease 0s",
            padding: "0.6rem",
            borderRadius: "0.2rem",
            cursor: "pointer",
          }}
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchform;
