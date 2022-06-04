import './AuthPage.css';
import { useState } from 'react';
import { LoginForm, SignupForm, LoadingSpinner } from '../../components';

const AuthPage = props => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authMethodSwitchHandler = () => {
    setIsLogin(prev => !prev);
  };

  if (isLoading) return <LoadingSpinner />;
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
          <LoginForm
            onSwitch={authMethodSwitchHandler}
            setIsLoading={setIsLoading}
          />
        ) : (
          <SignupForm
            onSwitch={authMethodSwitchHandler}
            setIsLoading={setIsLoading}
          />
        )}
      </div>
    </main>
  );
};
export { AuthPage };
