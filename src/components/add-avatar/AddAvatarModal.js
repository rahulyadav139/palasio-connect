import './AddAvatarModal.css';
import { Modal } from '../ui/modal/Modal';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAvatarImage } from '../../store/user-slice';
import { useNavigate } from 'react-router-dom';

const AddAvatarModal = ({ onCloseModal }) => {
  const [localImagePath, setLocalImagePath] = useState('');
  const imageRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector(state => state.user);

  const uploadImageHandler = e => {
    if (e.target.files && e.target.files.length > 0) {
      setLocalImagePath(e.target.files[0]);
    }
  };

  const addAvatarHandler = e => {
    e.preventDefault();
    const image = imageRef.current.files[0];
    if (!image) return console.log('invalid input');
    const form = new FormData();

    form.append('image', image);

    dispatch(addAvatarImage(form));

    navigate(`/profile/${userId}`);
  };
  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="add-new-post-container">
        <h3>Add Avatar</h3>
        <div className="hr-line thin fad" />
        <form
          onSubmit={addAvatarHandler}
          encType="multipart/form-data"
          action=""
          className="flex col gap"
        >
          <input
            id="file-picker"
            type="file"
            accept="image/png, image/jpeg"
            onChange={uploadImageHandler}
            ref={imageRef}
          />

          {!localImagePath ? (
            <label className="file-picker-label" htmlFor="file-picker">
              <i className="fas fa-image"></i>
            </label>
          ) : (
            <img
              src={localImagePath ? URL.createObjectURL(localImagePath) : ''}
              alt="new"
            />
          )}

          <button type="submit" className="btn primary">
            Upload
          </button>
        </form>
        <button onClick={onCloseModal} className="btn-dismiss btn icon medium">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </Modal>
  );
};

export { AddAvatarModal };
