import './ChangePassword.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ChangePassword = props => {
  const [{ oldPassword, newPassword, confirmPassword }, setPasswordData] =
    useState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  const { token } = useSelector(state => state.auth);
  const { userId } = useSelector(state => state.user);
  const navigate = useNavigate();

  const passwordChangeHandler = async e => {
    e.preventDefault();

    if (newPassword !== confirmPassword) return;

    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + '/user/change-password',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      if (res.status === 401) return;

      if (!res.ok) return;

      navigate(`/profile/${userId}`);
    } catch (err) {
      console.log(err);
    }
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
