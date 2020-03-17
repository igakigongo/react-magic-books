/**
 * action types
 */
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const CREATE_BOOK = 'CREATE_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';

/**
 * actions
 */
export const changeFilter = (category = 'ALL') => ({
  type: CHANGE_FILTER,
  category,
});

export const createBook = book => ({
  type: CREATE_BOOK,
  book,
});

export const removeBook = bookId => ({
  type: REMOVE_BOOK,
  bookId,
});
