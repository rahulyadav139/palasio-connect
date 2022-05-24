import './AddNewPostModal.css';
import { Modal } from '../ui/modal/Modal';
import { useState, useRef } from 'react';

import { useDispatch } from 'react-redux';

import { createNewPost } from '../../store/post-slice';

const AddNewPostModal = ({ onCloseModal }) => {
  const [localImagePath, setLocalImagePath] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const imageRef = useRef();
  const captionRef = useRef();

  const dispatch = useDispatch();

  const createNewPostHandler = async e => {
    e.preventDefault();

    const image = imageRef.current.files[0];
    const caption = captionRef.current.value;

    if (!image || !caption) return console.log('invalid input');

    const form = new FormData();

    form.append('image', image);
    form.append('caption', caption);

    // const callNow = () => Promise.resolve();

    setIsUploading(true);

    dispatch(createNewPost(form)).then(() => {
      setIsUploading(false);
      onCloseModal();
    });

    // dispatch(getPosts());
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
              <i className="fas fa-image"></i>
            </label>
          ) : (
            <img
              src={localImagePath ? URL.createObjectURL(localImagePath) : ''}
              alt="new-post"
            />
          )}

          <textarea
            ref={captionRef}
            id="post-caption"
            placeholder="Caption"
            row="3"
          ></textarea>
          <button
            disabled={isUploading}
            type="submit"
            className={isUploading ? 'btn primary disable' : 'btn primary'}
          >
            {isUploading ? 'Posting' : ' Post'}
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
