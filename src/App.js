import logo from './logo.svg';
import './App.css';
import PublicNote from './components/PublicNote';
import PrivateNote from './components/PrivateNote';

function App() {
  return (
    <div className="App">
      <PublicNote />
      <PrivateNote />
    </div>
  );
}

export default App;
