import React from "react";

const ListGroup = props => {
  const { title, group, onSelect, selectedGroup } = props;
  const classes = "list-group-item";
  const groupMembers = [...group];
  return (
    <ul className="list-group">
      <li
        key="genre-list"
        className="list-group-item list-group-item-primary"
        onClick={() => onSelect("")}
      >
        {title}
      </li>
      {groupMembers.map(key => (
        <li
          key={key}
          className={selectedGroup === key ? `${classes} active` : classes}
          onClick={() => onSelect(key)}
        >
          {key}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
