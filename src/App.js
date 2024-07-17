import './App.css';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Wordle from './components/Wordle';

function App() {
  return (
    <div className="App">
      <h2>Coding Interview Practise</h2>
      <FetchData />
      {/* <Wordle /> */}
      <Counter />
    </div>
  );
}

export default App;