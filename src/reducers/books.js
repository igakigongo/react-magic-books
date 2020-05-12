import { createSlice } from '@reduxjs/toolkit';
import BookCategories from '../static';
import Book from '../factories/book';

const initialState = [
  Book('The Book of Ivy', BookCategories.FICTION),
  Book('Dear Edward', BookCategories.SCI_FI),
  Book('Dracula', BookCategories.HORROR),
];

const books = createSlice({
  name: 'books',
  initialState,
  reducers: {
    create: (state, action) => {
      const shallowCopy = state.slice();
      shallowCopy.splice(0, 0, action.payload);
      return shallowCopy;
    },
    remove: (state, action) => state.filter(x => x.id !== action.payload),
  },
});

export const { create, remove } = books.actions;
export default books.reducer;
