import './AuthForm.css';
import { useInput, useFetch } from '../../hooks';
import { useState } from 'react';
import { AuthActions } from '../../store/actions';
import { useDispatch } from 'react-redux';

const LoginForm = props => {
  const [showPassword, setShowPassword] = useState(false);
  const { sendData } = useFetch();
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

  const submitHandler = async e => {
    e.preventDefault();
    if (!emailIsValid || !passwordIsValid) {
      emailIsTouched(true);
      passwordIsTouched(true);
      return;
    }

    const { data, error, status } = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/auth/login',
      'POST',
      {
        email: email.toLowerCase(),
        password,
      },
      false
    );

    if (error) return;

    const { fullName, username: loginUsername, token, userId } = data;

    dispatch(
      AuthActions.loginHandler({
        fullName,
        username: loginUsername,
        token,
        userId,
      })
    );
  };

  const guestLoginHandler = async () => {};

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
        <span onClick={props.onSwitch} className="switch__method">
          Signup here
        </span>
      </p>
    </form>
  );
};
export { LoginForm };
