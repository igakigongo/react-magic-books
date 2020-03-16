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

export default Book;
