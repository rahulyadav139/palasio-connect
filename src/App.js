import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  Homepage,
  AuthPage,
  Suggestions,
  Profile,
  Account,
  ExplorePage,
} from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </div>
  );
}

export default App;
