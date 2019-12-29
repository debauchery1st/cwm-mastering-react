import React from "react";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = path => {
    const cloned = { ...sortColumn };
    const orders = ["asc", "desc"];
    const idx =
      path === cloned.path
        ? (orders.indexOf(cloned.order) + 1) % 2
        : orders.indexOf(cloned.order);
    cloned.path = path;
    cloned.order = orders[idx];
    onSort(cloned);
  };
  const renderSortIcon = column => {
    if (!column.path) return "";
    if (column.path !== sortColumn.path) return "";
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };

  const renderClasses = column => {
    if (!column.path) return "";
    return "clickable";
  };

  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            className={renderClasses(column)}
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
