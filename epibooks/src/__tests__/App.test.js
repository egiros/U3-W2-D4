import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

// 1.Verifica che il componente Welcome venga montato correttamente.
// 2.Verifica che vengano effettivamente renderizzate tante bootstrap cards quanti sono i libri nel file json utilizzato.
// 3.Verifica che il componente CommentArea venga renderizzato correttamente.
// 4.Verifica, magari con più tests, che il filtraggio dei libri tramite navbar si comporti come previsto.
// 5.Verifica che, cliccando su un libro, il suo bordo cambi colore.
// 6.Verifica che, cliccando su di un secondo libro dopo il primo, il bordo del primo libro ritorni normale.
// 7.Verifica che all’avvio della pagina, senza aver ancora cliccato su nessun libro, non ci siano istanze del componente SingleComment all’interno del DOM.
// 8.Verifica infine che, cliccando su di un libro con recensioni, esse vengano caricate correttamente all’interno del DOM.

describe("Main render component test", () => {
  it("mount the Welcome correctly", () => {
    render(<App />);
    const mainHeader = screen.getByRole(" heading ", { name: /benvenuti in epibooks!/i });
    expect(mainHeader).toBeInTheDocument();
  });

  it("renders all the 150 books", () => {
    render(<App />);
    const allTheBookCards = screen.getAllByTestId("book-card");
    expect(allTheBookCards).toHaveLegth(150);
  });

  it("renders CommentArea component", () => {
    render(<App />);
    const reviewInputField = screen.getByPlaceholderText(/inserisci qui il testo/i);
    expect(reviewInputField).toBeInTheDocument();
  });
});

describe("filter testing", () => {
  it("Find just one result for the word 'arrow'", () => {
    render(<App />);
    const filterInputField = screen.getByPlaceholderText(/cerca un libro/i);
    fireEvent.change(filterInputField, { target: { value: "arrows" } });
    const allTheBookCards = screen.getAllByTestId("book-card");
    expect(allTheBookCards).toHaveLength(1);
  });

  it("Find just one result for the word 'witcher'", () => {
    render(<App />);
    const filterInputField = screen.getByPlaceholderText(/cerca un libro/i);
    fireEvent.change(filterInputField, { target: { value: "witcher" } });
    const allTheBookCards = screen.getAllByTestId("book-card");
    expect(allTheBookCards).toHaveLength(3);
  });
});

describe("SingleBook testing", () => {
  it("makes book card border change clicking on it", () => {
    render(<App />);
    const allTheBookCards = screen.getAllByTestId("book-card");
    const firstBookCard = allTheBookCards[0];
    fireEvent.click(firstBookCard);
    expect(firstBookCard).toHaveStyle("border: 3px solid red");
  });

  it("restores normal border afrer clicking on a second book", () => {
    render(<App />);
    const allTheBookCards = screen.getAllByTestId("book-card");
    const firstBookCard = allTheBookCards[0];
    fireEvent.click(firstBookCard);
    expect(firstBookCard).toHaveStyle("border: 3px solid red");
    const secondBookCard = allTheBookCards;
    fireEvent.click(secondBookCard);
    expect(firstBookCard).toHaveStyle("border: 3px solid red");
  });
});

describe("CommentList testing", () => {
  it("renders no book comments on load", () => {
    render(<App />);
    const allTheBookComments = screen.queryAllByTestId("single-comment");
    expect(allTheBookComments).toHaveLength(0);
  });

  it("renders comments clicking on a valid book", async () => {
    render(<App />);
    const allTheBookCards = screen.getAllByTestId("book-card");
    const firstBookCard = allTheBookCards[0];
    fireEvent.click(firstBookCard);
    const allTheBookComments = await screen.findAllByTestId("single-comment");
    expect(allTheBookComments).not.toHaveLength(0);
  });
});
