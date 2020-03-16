import React, { useEffect, useState } from 'react';
import {
  Button, Card, Col, Form, Row,
} from 'react-bootstrap';
import BookCategories from '../static';

const categories = [...Object.values(BookCategories)];

const useInputWithValidation = (initialState, required = false) => {
  const [borderClass, setBorderClass] = useState('');
  const [pristine, setPristine] = useState(null);
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
    required,
    value,
  };
};

const BooksForm = () => {
  const [category, setCategory] = useState('');
  const {
    borderClass: titleBorderClass,
    onChange: titleChangeHandler,
    pristine: titlePristine,
    value: title,
  } = useInputWithValidation('', true);


  const handleSubmit = e => {
    e.preventDefault();
  };

  // TODO: Move this validation inside the custom hook
  const titleIsValid = () => titlePristine !== null && titlePristine && !title;

  return (
    <Row>
      <Col sm={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
        <Card className="shadow">
          <Card.Header className="font-weight-bold">Book Form</Card.Header>
          <Card.Body className="px-5">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="titleControlId">
                <Form.Label>Title</Form.Label>
                <Form.Control className={titleBorderClass} onChange={titleChangeHandler} type="text" value={title} />
                {titleIsValid() && (<Form.Text className="text-danger">Title is required</Form.Text>)}
              </Form.Group>

              <Form.Group controlId="selectListControlId">
                <Form.Label>Category</Form.Label>
                <Form.Control as="select" className="border-success" defaultValue={category} onChange={e => { setCategory(e.currentTarget.value); }}>
                  {categories.sort().map(category => (<option key={category}>{category}</option>))}
                </Form.Control>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col}>
                  <Button block type="submit" variant="success">
                    Submit
                  </Button>
                </Form.Group>
                <Form.Group as={Col}>
                  <Button block type="submit" variant="secondary">
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

export default BooksForm;
