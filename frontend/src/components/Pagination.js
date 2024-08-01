import React from 'react';

const Pagination = ({ totalPages, setCurrentPage }) => {
  const pages = [...Array(totalPages).keys()].map(n => n + 1);

  return (
    <div className="pagination">
      {pages.map(page => (
        <button key={page} onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
