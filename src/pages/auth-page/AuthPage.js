import './AuthPage.css';
import { useState } from 'react';
import { LoginForm, SignupForm } from '../../components';

const AuthPage = props => {
  const [isLogin, setIsLogin] = useState(true);

  const authMethodSwitchHandler = () => {
    setIsLogin(prev => !prev);
  };
  return (
    <main className="main-auth-page">
      <div className="intro-section">
        <div className="brand">
          <span className="brand__logo">
            <i className="bi bi-hurricane"></i>
          </span>
          <span className="brand__text">PALASIO CONNECT</span>
        </div>

        <p>
          Palasio Connect is great for meeting new people, making friends and
          sharing interests.
        </p>
        <p>Time to be Social, Go social...</p>
      </div>

      <div className="auth-form-section">
        {isLogin ? (
          <LoginForm onSwitch={authMethodSwitchHandler} />
        ) : (
          <SignupForm onSwitch={authMethodSwitchHandler} />
        )}
      </div>
    </main>
  );
};
export { AuthPage };
