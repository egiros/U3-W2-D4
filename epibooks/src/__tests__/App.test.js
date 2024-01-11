import { render, screen } from "@testing-library/react";
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
});
