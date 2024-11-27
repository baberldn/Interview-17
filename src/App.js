import React, { useState } from "react";

function App() {
  const unlockedScreen = () => (
    <div style={{ textAlign: "center", fontSize: "24px", color: "green" }}>
      Login oldunuz.
    </div>
  );

  return (
    <CombinationLock combination={[1, 2, 3, 4]} NextScreen={unlockedScreen} />
  );
}

const CombinationLock = ({ combination, NextScreen }) => {
  const [input, setInput] = useState([]);
  const [error, setError] = useState(false);

  const handleButtonClick = (number) => {
    setInput((prevInput) => {
      const newInput = [...prevInput, number];

      
      if (newInput.length === combination.length) {
        if (JSON.stringify(newInput) === JSON.stringify(combination)) {
          setError(false); 
        } else {
          setError(true);
          setTimeout(() => {
            setInput([]); 
            setError(false); 
          }, 1500); 
        }
      }

      return newInput.length <= combination.length ? newInput : prevInput;
    });
  };

  const resetInput = () => setInput([]);

  if (JSON.stringify(input) === JSON.stringify(combination)) {
    return <NextScreen />;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          color: error ? "red" : "black",
        }}
      >
        {error ? "Hatalı kombinasyon!" : input.join(" ")}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", maxWidth: "200px", margin: "0 auto" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((number) => (
          <button
            key={number}
            onClick={() => handleButtonClick(number)}
            style={{
              fontSize: "20px",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid black",
              cursor: "pointer",
            }}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={resetInput}
        style={{
          marginTop: "20px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sıfırla
      </button>
    </div>
  );
};

export default App;
