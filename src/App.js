import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Homepage, AuthPage, Suggestions } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Suggestions />} />
      </Routes>
    </div>
  );
}

export default App;
