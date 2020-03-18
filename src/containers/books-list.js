import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeFilter, removeBook } from '../actions';
import Book from '../components/book';
import CategoryFilter from '../components/category-filter';


const BooksList = ({
  books, category, deleteBook, filterBooks,
}) => {
  const handleRemoveBook = book => {
    const { id } = book;
    deleteBook(id);
  };

  const handleFilterChange = filterCategory => {
    filterBooks(filterCategory);
  };

  const filteredBooks = category === 'ALL' ? books : books.filter(x => x.category === category);

  return (
    <>
      {books.length < 0 && (
      <div className="alert alert-info mt-3">
        <strong>Info:</strong>
        &nbsp;&nbsp;No Books In The Store
      </div>
      )}
      {books.length > 0 && (
        <>
          <CategoryFilter changeFilterHandler={handleFilterChange} />
          {filteredBooks.length === 0 && (
            <div className="alert alert-info mt-3">
              <strong>Info:</strong>
                &nbsp;&nbsp;No Books In The&nbsp;
                {category}
              &nbsp;Category
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
      )}
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
  const { books } = state.books;
  const { filterCategory: category } = state.filterCategory;
  return {
    books,
    category,
  };
};

const mapDispatchToProps = dispatch => ({
  deleteBook: id => {
    dispatch(removeBook(id));
  },
  filterBooks: category => {
    dispatch(changeFilter(category));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
