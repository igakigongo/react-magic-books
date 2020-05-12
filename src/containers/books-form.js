import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import {
  Button, Card, Col, Form,
} from 'react-bootstrap';
import Book from '../factories/book';
import BookCategories from '../static';
import { create } from '../reducers/books';

const categories = [...Object.values(BookCategories)];

const useInputWithValidation = (initialState, required = false) => {
  const [borderClass, setBorderClass] = useState('');
  const [pristine, setPristine] = useState(null);
  const ref = useRef();
  const [value, setValue] = useState(initialState);

  useEffect(() => {
    if (pristine === null) {
      return;
    }
    setBorderClass(pristine && value ? 'border-success' : 'border-danger');
  }, [pristine, value]);

  const onChange = e => {
    const { value } = e.currentTarget;
    setValue(value);
    if (required) {
      setPristine(true);
    }
  };

  return {
    borderClass,
    onChange,
    pristine,
    ref,
    required,
    value,
  };
};

const BooksForm = ({ dispatch }) => {
  const { addToast } = useToasts();
  const [category, setCategory] = useState(BookCategories.ACTION);
  const {
    borderClass: titleBorderClass,
    onChange: titleChangeHandler,
    pristine: titlePristine,
    ref: titleRef,
    value: title,
  } = useInputWithValidation('', true);

  const resetForm = () => {
    titleRef.current.value = '';
    setCategory(BookCategories.ACTION);
  };

  const titleIsValid = () => titlePristine !== null && titlePristine && !title;

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) {
      addToast('Please add a book title', { appearance: 'error' });
      return;
    }

    dispatch(create(Book(title, category)));
    addToast('Book added', { appearance: 'success' });
    setTimeout(() => {
      resetForm();
    }, 2000);
  };

  return (
    <Card className="shadow-lg">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group className="mb-0 col-7" controlId="titleControlId">
              <Form.Control
                className={titleBorderClass}
                onChange={titleChangeHandler}
                placeholder="Book Title"
                ref={titleRef}
                type="text"
                value={title}
              />
              {titleIsValid() && (<Form.Text className="text-danger">Title is required</Form.Text>)}
            </Form.Group>
            <Form.Group className="mb-0 col-3" controlId="selectListControlId">
              <Form.Control
                as="select"
                className="border-success"
                onChange={e => { setCategory(e.target.value); }}
              >
                {categories.sort().map(x => (<option key={x}>{x}</option>))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} className="mb-0 col-2">
              <Button block type="submit" variant="primary">
                Submit
              </Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

BooksForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(BooksForm);
