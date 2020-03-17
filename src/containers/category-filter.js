import React from 'react';
import PropTypes from 'prop-types';
import BookCategories from '../static';

const categories = [...Object.values(BookCategories)];

const CategoryFilter = ({ changeFilterHandler }) => {
  const handleChange = e => {
    const { value } = e.target;
    changeFilterHandler(value);
  };

  return (
    <select className="mt-3" defaultValue="ALL" onChange={handleChange}>
      <option value="ALL">All Categories</option>
      {categories.sort(x => x).map(c => (
        <option key={c}>
          {c}
        </option>
      ))}
    </select>
  );
};

CategoryFilter.propTypes = {
  changeFilterHandler: PropTypes.func.isRequired,
};

export default CategoryFilter;
