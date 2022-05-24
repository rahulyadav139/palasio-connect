import './ChangePassword.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastActions } from '../../../store/toast-slice';
import { changeUserPassword } from '../../../store/user-slice';
const ChangePassword = props => {
  const [{ oldPassword, newPassword, confirmPassword }, setPasswordData] =
    useState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

  const { userId } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passwordChangeHandler = async e => {
    e.preventDefault();

    if (newPassword !== confirmPassword)
      return dispatch(
        ToastActions.setToast({
          type: 'danger',
          message: "Password doesn't match!",
        })
      );

    dispatch(changeUserPassword({ oldPassword, newPassword })).then(res => {
      if (res.error.message.includes('409')) {
        dispatch(
          ToastActions.setToast({
            type: 'danger',
            message: 'Action forbidden! This is a test account',
          })
        );
      } else if (res.error.message.includes('401')) {
        dispatch(
          ToastActions.setToast({
            type: 'danger',
            message: 'Incorrect password!',
          })
        );
      } else {
        dispatch(
          ToastActions.setToast({
            type: 'success',
            message: 'Password changed successfully!',
          })
        );

        navigate(`/profile/${userId}`);
      }
    });
  };
  return (
    <form onSubmit={passwordChangeHandler} className="change-password-form">
      <h2>Change Password</h2>
      <div className="hr-line thin fad"></div>
      <div className="form__row">
        <label>Old Password</label>
        <input
          onChange={e =>
            setPasswordData(prev => ({ ...prev, oldPassword: e.target.value }))
          }
          value={oldPassword}
          type="password"
        />
      </div>
      <div className="form__row">
        <label>New Password</label>
        <input
          onChange={e =>
            setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))
          }
          value={newPassword}
          type="password"
        />
      </div>
      <div className="form__row">
        <label>Confirm Password</label>
        <input
          onChange={e =>
            setPasswordData(prev => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          value={confirmPassword}
          type="password"
        />
      </div>
      <button className="btn-update btn primary" type="submit">
        Update
      </button>
    </form>
  );
};
export { ChangePassword };
