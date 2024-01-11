import { Card } from "react-bootstrap";

const SingleBook = ({ book, selectedBook, changeSelectedBook }) => {
  return (
    <>
      <Card
        onClick={() => changeSelectedBook(book.asin)}
        style={{
          border: `3px solid ${selectedBook === book.asin ? "red" : "#ebebebeb"}`,
        }}
      >
        <Card.Img variant="top" src={book.img} />
        <Card.Body>
          <Card.Title style={{ color: "black" }}>{book.title}</Card.Title>
        </Card.Body>
      </Card>
    </>
  );
};

export default SingleBook;
