import './AuthForm.css';
import { useInput } from '../../hooks';
import { useState } from 'react';
import { loginUser } from '../../store/auth-slice';
import { useDispatch } from 'react-redux';
import { ToastActions } from '../../store/toast-slice';

const LoginForm = ({ setIsLoading, onSwitch }) => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const {
    value: email,
    setIsTouched: emailIsTouched,
    isValid: emailIsValid,
    isInvalid: emailIsInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(
    value => value.includes('@') === true && value.includes('.') === true
  );

  const {
    value: password,
    setIsTouched: passwordIsTouched,
    isValid: passwordIsValid,
    isInvalid: passwordIsInvalid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(value => value.length !== 0);

  const emailClasses = emailIsInvalid
    ? 'input-field responsive error'
    : 'input-field responsive';
  const passwordClasses = passwordIsInvalid
    ? 'input-field-icon responsive error'
    : 'input-field-icon responsive';

  const showPasswordHandler = () => {
    setShowPassword(prev => !prev);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      emailIsTouched(true);
      passwordIsTouched(true);
      return;
    }
    setIsLoading(true);
    dispatch(
      loginUser({
        email: email.toLowerCase(),
        password,
      })
    ).then(res => {
      if (res.error.message.includes('404')) {
        dispatch(
          ToastActions.setToast({
            type: 'danger',
            message: 'User not found!',
          })
        );
      }
      if (res.error.message.includes('401')) {
        dispatch(
          ToastActions.setToast({
            type: 'danger',
            message: 'Invalid password!',
          })
        );
      }
      setIsLoading(false);
    });
  };

  const guestLoginHandler = e => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(
      loginUser({
        email: process.env.REACT_APP_TEST_ID,
        password: process.env.REACT_APP_TEST_PASSWORD,
      })
    ).then(() => {
      setIsLoading(false);
    });
  };

  return (
    <form onSubmit={submitHandler} className="auth-form shadow">
      <div className="heading-5 text-center text-primary-dark">
        Welcome Back
      </div>
      <p className="instruction">
        Enter your credentials to access your account
      </p>
      <div>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          id="email"
          className={emailClasses}
          type="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <div className={passwordClasses}>
          <label>
            <span className="icon small" onClick={showPasswordHandler}>
              <i
                className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}
              ></i>
            </span>
            <input
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              id="password"
              className="input-field "
              type={showPassword ? 'text' : 'password'}
            />
          </label>
        </div>
      </div>

      <button type="submit" className="btn primary">
        Login
      </button>
      <button
        onClick={guestLoginHandler}
        type="button"
        className="btn outline primary btn-guest-login"
      >
        Guest Login
      </button>
      <p className="switch__msg">
        Already a member?{' '}
        <span onClick={onSwitch} className="switch__method">
          Signup here
        </span>
      </p>
    </form>
  );
};
export { LoginForm };
