import React, { useState } from "react";
import NavBar from "./components/navbar";
import Counters from "./components/counters";
import "./App.css";

function App() {
  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 }
  ]);
  const handleReset = () => {
    const cloned = [...counters];
    const reset = cloned.map(c => {
      c.value = 0;
      return c;
    });
    setCounters(reset);
  };
  const handleDelete = counterId => {
    const cloned = [...counters];
    const filtered = cloned.filter(c => c.id !== counterId);
    setCounters(filtered);
  };
  const handleIncrement = counterId => {
    const cloned = [...counters];
    const incremented = cloned.map(c => {
      if (c.id === counterId) c.value++;
      return c;
    });
    setCounters(incremented);
  };
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Counters
          counters={counters}
          onReset={handleReset}
          onDelete={handleDelete}
          onIncrement={handleIncrement}
        />
      </main>
    </React.Fragment>
  );
}

export default App;
