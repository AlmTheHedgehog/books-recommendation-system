// src/Books.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./img/Book.svg";
import Searchform from "./searchform";
import Book from "./book";
import LoadingCard from "./loadingCard";

const BookDetails = ({ user,mood }) => {
  const [details, setDetails] = useState([]);
  const [searchRecomm, setSearchRecomm] = useState([]);
  const [term, setTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);

      if (!user || !mood) {
        setIsLoading(false);
        return; // Exit early if user or mood is null
      }

      try {
        console.log(user);
        console.log(mood);
        console.log(term);
        let response;
        if(term === ""){
          response = await axios.get(`http://localhost:5000/recommandations`, {
            params: {
              id: user.bookId,
              happy: mood.happy || 0.0,
              angry: mood.angry || 0.0,
              surprise: mood.surprise || 0.0,
              sad: mood.sad || 0.0,
              fear: mood.fear || 0.0,
            },
          });
          setDetails(response.data);
        }else{
          response = await axios.get(`http://localhost:5000/search`, {
            params: {
              query: term,
            },
          });
          setDetails(response.data.search);
          setSearchRecomm(response.data.recommand);
        }
        console.log(response);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to fetch book recommendations. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [term, user, mood]);

  return (
    <>
      <Searchform searchText={(text) => setTerm(text)}></Searchform>
      {isLoading ? (
        <section className="container" style={{ padding: "2rem 0rem" }}>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : !details ? (
        <h1
          className="loading-name"
          style={{
            background: "white",
            borderRadius: "1rem",
            color: "#DB4437",
            padding: "1rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            fontSize: 33,
            transform: "translate(-50%,-50%)",
            textTransform: "capitalize",
          }}
        >
          😞 Couldn't find books about {term}
        </h1>
      ) : (
        <section>
          <section className="container" style={{ padding: "2rem 0rem" }}>
              {details.map((book, index) => (
                <Book
                  key={index}
                  name={book.name}
                  author={book.author}
                  stars={book.book_depository_stars}
                  category={book.category}
                  imgPath={book.img_paths}
                />
              ))}

            <div>
              {term === "" && (
                <div className="custom-card">
                  <h3 style={{ fontSize: "1.32rem", color: "white" }}>
                    Didn't find the book you like?
                  </h3>
                  <br />

                  <img
                    style={{ width: "100%" }}
                    src={logo}
                    alt="A man reading a book"
                    srcSet=""
                  />

                  <h3 style={{ fontSize: "1.21rem", color: "white" }}>
                    Search for it in the search box!
                  </h3>
                </div>
              )}
            </div>
          </section>

          {term !== "" && (
            <div>
              <div className="recommendation-separator">
                <h2>We also recommend</h2>
              </div>
              <section className="container" style={{ padding: "2rem 0rem" }}>
                {searchRecomm.map((book, index) => (
                  <Book
                    key={index}
                    name={book.name}
                    author={book.author}
                    stars={book.book_depository_stars}
                    category={book.category}
                    imgPath={book.img_paths}
                  />
                ))}
              </section>
            </div>
          )}

        </section>
      )}
    </>
  );
};

export default BookDetails;
