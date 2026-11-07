import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {
  return (
    <>
      <Header />
      <main>
        <Quiz />
      </main>
      <footer id="footer">
        <a
          href="https://github.com/AkshayTripathiAI/QuizPlay"
          target="_blank"
          rel="noreferrer"
        >
          View source on GitHub
        </a>
      </footer>
    </>
  );
}

export default App;
