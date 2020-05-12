import React from "react";
import { Header } from "./pages/Header";
import { Body } from "./pages/Body";

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Body />
      </main>
      <footer>
        <div>
          Fonte dos dados:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://covid.saude.gov.br"
          >
            https://covid.saude.gov.br
          </a>
        </div>
        <div>
          Projeto:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/lfabianosb/covid-19"
          >
            https://github.com/lfabianosb/covid-19
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
