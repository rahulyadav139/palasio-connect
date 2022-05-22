import './DeleteAccount.css';
import randomString from 'random-string';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUserAccount } from '../../../store/user-slice';
import { AuthActions } from '../../../store/auth-slice';
import { ToastActions } from '../../../store/toast-slice';

const DeleteAccount = props => {
  const [deleteAccountCaptcha, setDeleteAccountCaptcha] = useState(
    randomString({ length: 8 })
  );

  const dispatch = useDispatch();

  const inputRef = useRef();
  const navigate = useNavigate();

  const userAccountDeleteHandler = async () => {
    const userInput = inputRef.current.value;

    if (userInput !== deleteAccountCaptcha) {
      setDeleteAccountCaptcha(randomString({ length: 8 }));
      return;
    }

    dispatch(deleteUserAccount()).then(res => {
      if (res.error.message.includes('409')) {
        dispatch(
          ToastActions.setToast({
            type: 'danger',
            message: 'You can not delete test account!',
          })
        );
      } else {
        dispatch(AuthActions.logoutUser());
        navigate('/');
      }
    });
  };

  return (
    <div className="delete-confirmation-container">
      <h1 className="text-center">Delete Confirmation</h1>
      <p className="text-center">
        Once you delete your account, all of your information will be delete
        forever. We will not be able to restore your account. Are you sure you
        want to proceed?
      </p>
      <p className="text-center text-bold">
        Confirm by typing{' '}
        <span className="text-primary-dark">{deleteAccountCaptcha}</span> below
      </p>
      <input
        ref={inputRef}
        placeholder="Secret"
        onPaste={e => e.preventDefault()}
        className="input-field"
      />
      <button onClick={userAccountDeleteHandler} className="btn error">
        DELETE
      </button>
    </div>
  );
};
export { DeleteAccount };
