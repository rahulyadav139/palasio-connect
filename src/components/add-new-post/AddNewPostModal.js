import './AddNewPostModal.css';
import { Modal } from '../ui/modal/Modal';
import { useState, useRef } from 'react';
import { useFetch } from '../../hooks';

const AddNewPostModal = ({ onCloseModal }) => {
  const [newPost, setNewPost] = useState({});
  const { sendData } = useFetch();
  const imageRef = useRef();
  const captionRef = useRef();

  const createNewPostHandler = async e => {
    e.preventDefault();
    console.log(newPost);

    const image = imageRef.current.files[0];
    const caption = captionRef.current.value;

    const form = new FormData();

    form.append('image', image);
    form.append('caption', caption);

    // const { error } = await sendData(
    //   process.env.REACT_APP_BACKEND_URL + '/stats',
    //   'POST',
    //   form,
    //   false
    // );

    const res = await fetch(
      process.env.REACT_APP_BACKEND_URL + '/post/create-new-post',
      {
        method: 'POST',
        mode: 'no-cors',
        body: form,
      }
    );
    onCloseModal();
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
            ref={imageRef}
          />
          <label className="file-picker-label" htmlFor="file-picker">
            <i class="fas fa-image"></i>
          </label>
          <img src="" alt="" />
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
