import React from "react";
import "../src/sass/style.css";

const Header = () => {
  return (
    <>
      <div>
        <strong>
          <h2
            className="heading-name"
            style={{
              background: "none",
              // borderRadius: "1rem",
              marginBottom: 35,
              color: "#333",
              textAlign: "center",
              // fontWeight: "bold", //No need of bold because headings are itself bold
              textShadow: "2px 2px 3px #b0b0b0",
            }}
          >
            Bookflex
          </h2>
        </strong>
      </div>
    </>
  );
};

export default Header;
