import { CREATE_BOOK, REMOVE_BOOK } from '../actions/index';
import BookCategories from '../static';

const nanoId = require('nanoid');

/**
 * Simple Book Factory
 * @param {String} title,
 * @param {String} category
 */
const Book = (title, category) => ({
  id: nanoId(10).toUpperCase(),
  category,
  title,
});

const createBook = (state, action) => {
  const { book } = action;
  const { books } = state;
  return {
    ...state,
    books: [book, ...books],
  };
};

const removeBook = (state, action) => {
  const { bookId } = action;
  const { books } = state;
  return {
    ...state,
    books: books.filter(x => x.id !== bookId),
  };
};

const initialState = {
  books: [
    Book('The Book of Ivy', BookCategories.FICTION),
    Book('Dear Edward', BookCategories.SCI_FI),
    Book('Dracula', BookCategories.HORROR),
  ],
};

const booksReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case CREATE_BOOK: {
      return createBook(state, action);
    }
    case REMOVE_BOOK: {
      return removeBook(state, action);
    }
    default: {
      return state;
    }
  }
};

export default booksReducer;
