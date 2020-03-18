/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Col, Row,
} from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  animals,
  adjectives,
  names,
  uniqueNamesGenerator,
} from 'unique-names-generator';

const chaptersConfig = {
  dictionaries: [adjectives, animals, names],
  separator: ' ',
  style: 'capital',
};

const namesConfig = {
  dictionaries: [names],
  length: 1,
};

const randomAuthor = () => ({
  firstName: uniqueNamesGenerator(namesConfig),
  surname: uniqueNamesGenerator(namesConfig),
});

const randomChapter = () => {
  const min = Math.ceil(1);
  const max = Math.floor(20);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomChapterTitle = chapter => (chapter === 1
  ? 'Introduction'
  : uniqueNamesGenerator(chaptersConfig));

const randomPercentage = () => Math.floor(Math.random() * 100);

const Book = ({ book, handleRemoveBook }) => {
  const { category, title } = book;
  const author = randomAuthor();
  const percent = randomPercentage();
  const chapter = randomChapter();
  const chapterTitle = randomChapterTitle(chapter);

  return (
    <Card className="shadow-lg my-2">
      <Card.Body>
        <Row>
          <Col>
            <span className="font-weight-bold text-muted">{category}</span>
            <br />
            <h3>{title}</h3>
            <span>
              {author.firstName}
              &nbsp;
              {author.surname}
            </span>
            <ul className="list-unstyled d-flex font-weight-bold book-links">
              <li className="pr-2"><a href="#">Comments</a></li>
              <li className="border-left border-right px-2">
                <a onClick={() => { handleRemoveBook(book); }} href="#">
                  Remove Book
                </a>
              </li>
              <li className="pl-2"><a href="#">Edit</a></li>
            </ul>
          </Col>
          <Col className="d-flex flex-row justify-content-end align-items-center pr-4 border-right">
            <Row>
              <Col className="d-flex justify-content-end px-2" md={{ offset: 2 }}>
                <CircularProgressbar
                  strokeWidth={6}

                  styles={buildStyles({
                    rotation: 0,
                    strokeLinecap: 'butt',
                    textSize: '1.5rem',
                    pathTransitionDuration: 0.5,
                    pathColor: `rgb(98,0,238, ${percent / 100})`,
                    textColor: '#000',
                    trailColor: '#d6d6d6',
                    backgroundColor: '#3e98c7',
                  })}
                  value={percent}
                />
              </Col>
              <Col className="d-flex flex-column justify-content-center percent px-2">
                <h3 className="mb-0">
                  {`${percent}%`}
                </h3>
                <span className="text-muted percent">Completed</span>
              </Col>
            </Row>
          </Col>
          <Col className="pl-5">
            <p className="text-muted mb-1"><small>CURRENT CHAPTER</small></p>
            <p>
              Chapter
              &nbsp;
              {`${chapter}: ${chapterTitle}`}
            </p>
            <p><Button className="update-progress" size="sm" variant="primary">Update Progress</Button></p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

Book.propTypes = {
  book: PropTypes.objectOf(PropTypes.any).isRequired,
  handleRemoveBook: PropTypes.func.isRequired,
};

export default Book;
