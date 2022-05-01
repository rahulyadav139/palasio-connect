import './ChangePassword.css';

const ChangePassword = props => {
  return (
    <form className="change-password-form">
      <h2>Change Password</h2>
      <div className="hr-line thin fad"></div>
      <div className="form__row">
        <label>Old Password</label>
        <input type="text" />
      </div>
      <div className="form__row">
        <label>New Password</label>
        <input type="text" />
      </div>
      <div className="form__row">
        <label>Confirm Password</label>
        <input type="email" />
      </div>
      <button className="btn-update btn primary" type="submit">
        Update
      </button>
    </form>
  );
};
export { ChangePassword };
