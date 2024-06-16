import React from "react";
import defaultBook from "./img/defaultBook.png";
import "../src/sass/style.css";

const Book = ({ name, author, stars, category, imgPath }) => {
  const imageVariants = {
    hover: {
      scale: 1.7,
      boxShadow: "0px 0px 8px #000",
      transition: {
        duration: 0.5,
        type: "spring",
        delay: 0.15,
      },
    },
  };

  //setting up default values for volume info data
  name = name || "Title is not available";
  author = author || "Author(s) name not available";
  category = category || "Category not available";
  stars = stars || "No rating";
  // imgPath = null;//TODO: implement images loading!
  imgPath = imgPath || defaultBook;

  return (
    <section key={1} className="loading-card">
      <div>
        <div>
          <img
            src={`http://localhost:5000/img/${imgPath}`}
            width="100px"
            alt="Book-cover"
            variants={imageVariants}
            // whileHover="hover"
          />
        </div>
        <div>
          {name && (
            <div>
              <h3 className="inline">{name}</h3>
            </div>
          )}
        </div>

        <div>
          {author && (
            <h4 style={{ paddingBottom: "1rem", color: "black" }}>
              {" "}
              Author:{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: "#3B3B3B",
                }}
              >
                {" "}
                {author}{" "}
              </span>
            </h4>
          )}
        </div>

        <div>
          {category && (
            <h5 style={{ paddingBottom: "1rem", color: "black" }}>
              {" "}
              Category:{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: "#3B3B3B",
                }}
              >
                {" "}
                {category}{" "}
              </span>
            </h5>
          )}
        </div>

        <div>
          {stars && (
            <h5
              style={{
                fontWeight: "bold",
                color: "black",
                paddingBottom: "1rem",
              }}
            >
              Rating :{" "}
              <span
                style={{
                  fontWeight: "bold",
                  color: "#3B3B3B",
                }}
              >
                {" "}
                {stars}{" "}
              </span>
            </h5>
          )}
        </div>

        {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "1rem",
              }}
            > {language && }
              <p>
                {" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {" "}
                  Language :{" "}
                </span>{" "}
                {language}{" "}
              </p>
              <p>
                {" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    marginLeft: "1rem",
                  }}
                >
                  {" "}
                  Average Rating :{" "}
                </span>{" "}
                {averageRating}
              </p>
            </div> */}
      </div>
    </section>
  );
};

export default Book;
