import './AddNewPostModal.css';
import { Modal } from '../ui/modal/Modal';
import { useState, useRef } from 'react';
import { useFetch } from '../../hooks';
import { useSelector, useDispatch } from 'react-redux';
import { UserActions } from '../../store/user-slice';

const AddNewPostModal = ({ onCloseModal }) => {
  // const [newPost, setNewPost] = useState({});
  const [localImagePath, setLocalImagePath] = useState('');
  const imageRef = useRef();
  const captionRef = useRef();
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  console.log(token);

  const createNewPostHandler = async e => {
    e.preventDefault();

    const image = imageRef.current.files[0];
    const caption = captionRef.current.value;

    if (!image || !caption) return console.log('invalid input');

    const form = new FormData();

    form.append('image', image);
    form.append('caption', caption);

    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + '/post/create-new-post',
        {
          method: 'POST',

          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );

      dispatch(UserActions.createNewPost());
      onCloseModal();
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImageHandler = e => {
    if (e.target.files && e.target.files.length > 0) {
      setLocalImagePath(e.target.files[0]);
    }
  };

  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="add-new-post-container">
        <h3>Add New Post</h3>
        <div className="hr-line thin fad" />
        <form
          onSubmit={createNewPostHandler}
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
              <i class="fas fa-image"></i>
            </label>
          ) : (
            <img
              src={localImagePath ? URL.createObjectURL(localImagePath) : ''}
              alt="new-image-path"
            />
          )}

          <textarea
            ref={captionRef}
            id="post-caption"
            placeholder="Caption"
            row="3"
          ></textarea>
          <button type="submit" className="btn primary">
            Post
          </button>
        </form>
        <button onClick={onCloseModal} className="btn-dismiss btn icon medium">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </Modal>
  );
};
export { AddNewPostModal };
