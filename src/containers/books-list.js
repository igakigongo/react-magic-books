import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Book from '../components/book';
import { removeBook } from '../actions';

const BooksList = ({ books, deleteBook }) => {
  const handleRemoveBook = book => {
    const { id } = book;
    deleteBook(id);
  };

  return (
    <>
      {(books === null || books.length) < 1 && (
      <div className="alert alert-info mt-3">
        <strong>Info:</strong>
        No Books
      </div>
      )}
      {books.length > 0 && (
      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th className="text-center" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <Book
              book={book}
              handleRemoveBook={() => { handleRemoveBook(book); }}
              key={book.id}
            />
          ))}
        </tbody>
      </table>
      )}
    </>
  );
};

BooksList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.any),
  deleteBook: PropTypes.func.isRequired,
};

BooksList.defaultProps = {
  books: [],
};

const mapStateToProps = state => {
  const { books } = state.books;
  return {
    books,
  };
};

const mapDispatchToProps = dispatch => ({
  deleteBook: id => {
    dispatch(removeBook(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
