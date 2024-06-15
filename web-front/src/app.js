import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Books from "./books";
import Header from "./header";
import ScrollToTop from "./scrolltotop";
import Login from "./login";
import MoodSelection from "./moodSelection";
import "./sass/style.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [mood, setMood] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/mood-selection" element={<MoodSelection setMood={setMood} />} />
          <Route path="/home" element={
            <>
              <Header />
              <Books 
                user={user}
                mood={mood} />
              <ScrollToTop />
            </>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;