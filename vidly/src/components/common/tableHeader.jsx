import React from "react";

const TableHeader = props => {
  const { columns, sortColumn, onSort } = props;
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
    // setSortColumn(cloned);
  };

  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            key={column.path || column.key}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
