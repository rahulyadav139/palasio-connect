import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Homepage, AuthPage } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </div>
  );
}

export default App;
