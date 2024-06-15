import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sass/style.css";

const MoodSelection = ({ setMood }) => {
    const [moods, setMoods] = useState({
      happy: 0,
      angry: 0,
      surprise: 0,
      sad: 0,
      fear: 0
    });
    const navigate = useNavigate();
  
    const handleSliderChange = (e) => {
      const { name, value } = e.target;
      const newMoods = { ...moods, [name]: parseFloat(value) };
      const total = Object.values(newMoods).reduce((acc, val) => acc + val, 0);
      if (total <= 1) {
        setMoods(newMoods);
      }
    };
  
    const handleSubmit = () => {
      setMood(moods);
      navigate("/home");
    };
  
    const handleSkip = () => {
        const resetMoods = {
            happy: 0,
            angry: 0,
            surprise: 0,
            sad: 0,
            fear: 0
          };
          setMood(resetMoods);
          navigate("/home");
    };
  
    return (
      <div className="mood-container">
        <h2>Select Your Mood</h2>
        {Object.keys(moods).map((mood) => (
          <div key={mood} className="mood-slider">
            <label>{mood.charAt(0).toUpperCase() + mood.slice(1)}</label>
            <input
              type="range"
              name={mood}
              min="0"
              max="1"
              step="0.1"
              value={moods[mood]}
              onChange={handleSliderChange}
            />
            <span>{moods[mood]}</span>
          </div>
        ))}
        <div className="button-container">
          <button className="filled-button" onClick={handleSubmit}>OK</button>
          <button className="normal-button" onClick={handleSkip}>Don't take mood into account</button>
        </div>
      </div>
    );
  };
  
  export default MoodSelection;