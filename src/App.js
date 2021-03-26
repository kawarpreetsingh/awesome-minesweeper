import Game from './containers/Game/Game';

import './App.css';

// Starting component contains the app title and the stateful Game component
function App() {
  return (
    <div className="App">
      <div className="Title"><h1>Awesome Minesweeper</h1></div>
      <Game />
    </div>
  );
}

export default App;
