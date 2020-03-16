import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Book from '../components/book';

const BooksList = ({ books }) => (
  <>
    {(books === null || books.length) < 1 && (
      <div className="alert alert-info mt-3">
        <strong>Info:</strong>
        No Books
      </div>
    )}
    {books.length > 0 && (
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (<Book book={book} key={book.id} />))}
        </tbody>
      </table>
    )}
  </>
);

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.any),
};

BooksList.defaultProps = {
  books: [],
};

export default connect(state => {
  const { books } = state.books;
  return {
    books,
  };
})(BooksList);
