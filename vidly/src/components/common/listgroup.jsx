import React from "react";

const ListGroup = props => {
  const { title, group, onSelect, selectedGroup, textProp, keyProp } = props;
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
      {groupMembers.map(gm => (
        <li
          key={gm[keyProp]}
          className={
            selectedGroup === gm[textProp] ? `${classes} active` : classes
          }
          onClick={() => onSelect(gm[textProp])}
        >
          {gm[textProp]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProp: "name",
  keyProp: "_id"
};

export default ListGroup;
