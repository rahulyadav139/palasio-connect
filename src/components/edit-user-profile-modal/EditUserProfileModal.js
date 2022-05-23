import './EditUserProfileModal.css';
import { Modal } from '../ui/modal/Modal';

const EditUserProfileModal = ({ closeModal }) => {
  return (
    <Modal closeModal={closeModal}>
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
        <div className="form__actions">
          <button
            onClick={closeModal}
            className="btn outline primary"
            type="button"
          >
            Cancel
          </button>
          <button className="btn primary" type="submit">
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};
export { EditUserProfileModal };
