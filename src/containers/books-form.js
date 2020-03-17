import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import {
  Button, Card, Col, Form, Row,
} from 'react-bootstrap';
import Book from '../factories/book';
import BookCategories from '../static';
import { createBook } from '../actions';

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

    dispatch(createBook(Book(title, category)));
    addToast('Book added', { appearance: 'success' });
    setTimeout(() => {
      resetForm();
    }, 2000);
  };

  return (
    <Row>
      <Col sm={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
        <Card className="shadow">
          <Card.Header className="font-weight-bold">Book Form</Card.Header>
          <Card.Body className="px-5">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="titleControlId">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className={titleBorderClass}
                  onChange={titleChangeHandler}
                  ref={titleRef}
                  type="text"
                  value={title}
                />
                {titleIsValid() && (<Form.Text className="text-danger">Title is required</Form.Text>)}
              </Form.Group>

              <Form.Group controlId="selectListControlId">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  className="border-success"
                  onChange={e => { setCategory(e.target.value); }}
                >
                  {categories.sort().map(x => (<option key={x}>{x}</option>))}
                </Form.Control>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col}>
                  <Button block type="submit" variant="success">
                    Submit
                  </Button>
                </Form.Group>
                <Form.Group as={Col}>
                  <Button block type="reset" variant="secondary">
                    Cancel
                  </Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

BooksForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(BooksForm);
