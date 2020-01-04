import React from "react";

const ListGroup = ({ group, onSelect, selectedGroup, textProp, keyProp }) => {
  const classes = "list-group-item";
  // if (!group.map) return "";
  const listItem = (text, key, foo) => (
    <li
      key={key}
      className={
        selectedGroup === text || (selectedGroup === "" && key === "")
          ? `${classes} active`
          : classes
      }
      onClick={foo}
    >
      {text}
    </li>
  );
  return (
    <ul className="list-group">
      {group.map(gm => listItem(gm[textProp], gm[keyProp], () => onSelect(gm)))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProp: "name",
  keyProp: "_id"
};

export default ListGroup;
