import React from "react";
import Counter from "./counter";

const Counters = props => {
  return (
    <div>
      <button onClick={props.onReset} className="btn btn-primary btn-sm m-2">
        Reset
      </button>
      {props.counters.length > 0 &&
        props.counters.map(counter => (
          <Counter
            key={counter.id}
            onDelete={() => props.onDelete(counter.id)}
            onIncrement={() => props.onIncrement(counter.id)}
            counter={counter}
          />
        ))}
    </div>
  );
};

export default Counters;
