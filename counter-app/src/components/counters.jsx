import React from "react";
import Counter from "./counter";

const Counters = props => {
  const { onReset, onDelete, onIncrement, onDecrement, counters } = props;
  return (
    <div>
      <button onClick={onReset} className="btn btn-primary btn-sm m-2">
        Reset
      </button>
      {counters.length > 0 &&
        counters.map(counter => (
          <Counter
            key={counter.id}
            onDelete={() => onDelete(counter.id)}
            onIncrement={() => onIncrement(counter.id)}
            onDecrement={() => onDecrement(counter.id)}
            counter={counter}
          />
        ))}
    </div>
  );
};

export default Counters;
