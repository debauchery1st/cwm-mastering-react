const paginate = (items, pageNumber, pageSize) => {
  // total list of items, current pagenumber, and max items per page.
  const startIndex = (pageNumber - 1) * pageSize;
  return Array.from(items).slice(startIndex, startIndex + pageSize);
};

export default paginate;
