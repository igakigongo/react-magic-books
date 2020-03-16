import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book }) => {
  const { category, id, title } = book;
  return (
    <tr>
      <th scope="row"><code className="bg-light p-2 shadow-sm rounded">{id}</code></th>
      <td>{title}</td>
      <td>{category}</td>
    </tr>
  );
};

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Book;
