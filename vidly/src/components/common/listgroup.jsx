import React from "react";

const ListGroup = props => {
  const { group, onSelect, selectedGroup, textProp, keyProp } = props;
  const classes = "list-group-item";
  const groupMembers = [...group];
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
      {groupMembers.map(gm =>
        listItem(gm[textProp], gm[keyProp], () => onSelect(gm))
      )}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProp: "name",
  keyProp: "_id"
};

export default ListGroup;
