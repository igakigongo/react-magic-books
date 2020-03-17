const BASE_REDUX_ACTION_REGEX = /^[@]{2}\w+/i;

const DEFAULT_FILTER_CATEGORY = 'ALL';

const initialState = {
  filterCategory: DEFAULT_FILTER_CATEGORY,
};

const filterReducer = (state = initialState, action) => {
  const { category, type } = action;

  const filterCategory = typeof category === 'undefined' || BASE_REDUX_ACTION_REGEX.test(type)
    ? DEFAULT_FILTER_CATEGORY
    : category;

  return {
    ...state,
    filterCategory,
  };
};

export default filterReducer;
