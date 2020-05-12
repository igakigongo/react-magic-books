import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Book from '../components/book';
import CategoryFilter from '../components/category-filter';
import { remove } from '../reducers/books';
import { change } from '../reducers/filter';

const BooksList = ({
  books, category, deleteBook, filterBooks,
}) => {
  const handleRemoveBook = ({ id }) => deleteBook(id);
  const handleFilterChange = filterCategory => {
    filterBooks(filterCategory);
  };

  const filteredBooks = category === 'ALL' ? books : books.filter(x => x.category === category);

  if (books.length <= 0) {
    return (
      <>
        {books.length < 0 && (
        <div className="alert alert-info mt-3">
          <strong>Info:</strong>
        &nbsp;&nbsp;No Books In The Store
        </div>
        )}
      </>
    );
  }

  return (
    <>
      <CategoryFilter changeFilterHandler={handleFilterChange} />
      {filteredBooks.length === 0 && (
        <div className="alert alert-info mt-3">
          <strong className="mr-2">Info:</strong>
          {`No Books In The ${category} Category`}
        </div>
      )}
      {filteredBooks.length > 0 && filteredBooks.map(book => (
        <Book
          book={book}
          handleRemoveBook={() => { handleRemoveBook(book); }}
          key={book.id}
        />
      ))}
    </>
  );
};

BooksList.propTypes = {
  category: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteBook: PropTypes.func.isRequired,
  filterBooks: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { books, filter } = state;
  return {
    books,
    category: filter,
  };
};

const mapDispatchToProps = dispatch => ({
  deleteBook: id => {
    dispatch(remove(id));
  },
  filterBooks: category => {
    dispatch(change(category));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
