import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const Book = ({ book, handleRemoveBook }) => {
  const { category, id, title } = book;

  return (
    <tr>
      <th scope="row"><code className="bg-light p-2 shadow-sm rounded">{id}</code></th>
      <td>{title}</td>
      <td>{category}</td>
      <td className="text-center">
        <Button onClick={() => { handleRemoveBook(book); }} size="sm" type="button" variant="outline-danger">
          Remove Book
        </Button>
      </td>
    </tr>
  );
};

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.any).isRequired,
  handleRemoveBook: PropTypes.func.isRequired,
};

export default Book;
