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
import { useSelector } from 'react-redux';

function App() {
  const isAuth = useSelector(state => state.auth.isAuth);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isAuth ? <Homepage /> : <AuthPage />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </div>
  );
}

export default App;
