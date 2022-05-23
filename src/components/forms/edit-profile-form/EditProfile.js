import './EditProfile.css';

const EditProfile = props => {
  return (
    <form className="edit-profile-form">
      <h2>Update Profile</h2>
      <div className="hr-line thin fad"></div>
      <div className="flex gap center">
        <div className="avatar small">R</div>
        <div>
          <h3>Rahul Yadav</h3>
          <p className="text-small text-primary cursor-pointer">
            Change Profile Photo
          </p>
        </div>
      </div>

      <div className="form__row">
        <label>Name</label>
        <input type="text" />
      </div>
      <div className="form__row">
        <label>Username</label>
        <input type="text" />
      </div>
      <div className="form__row">
        <label>Email</label>
        <input type="email" />
      </div>
      <div className="form__row">
        <label>Bio</label>
        <textarea rows="5"></textarea>
      </div>
      <div className="form__row">
        <label>Website</label>
        <input type="text" />
      </div>
     
      <button className="btn-update btn primary" type="submit">
        Update
      </button>
   
    </form>
  );
};
export { EditProfile };
