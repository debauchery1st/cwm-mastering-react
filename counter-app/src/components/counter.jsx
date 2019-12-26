import React from "react";

const Counter = props => {
  const { onIncrement, onDecrement, onDelete, counter } = props;
  const getBadgeClasses = () => {
    let classes = "m-2 badge badge-";
    classes += counter.value === 0 ? "warning" : "primary";
    return classes;
  };
  const formatCount = () => {
    const { value: count } = counter;
    return count === 0 ? "Zero" : count;
  };
  return (
    <div className="row">
      <div className="col-1">
        <span className={getBadgeClasses()}>{formatCount()}</span>
      </div>
      <div className="col">
        <button
          onClick={() => onIncrement(counter)}
          className="btn btn-secondary btn-sm"
        >
          +
        </button>

        <button
          onClick={() => onDecrement(counter)}
          className="btn btn-secondary btn-sm m-2"
          disabled={counter.value === 0}
        >
          -
        </button>

        <button
          onClick={() => onDelete(counter.id)}
          className="btn btn-danger btn-sm"
        >
          x
        </button>
      </div>
    </div>
  );
};

export default Counter;
