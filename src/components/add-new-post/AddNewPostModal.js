import './AddNewPostModal.css';
import { Modal } from '../ui/modal/Modal';

const AddNewPostModal = ({ onCloseModal }) => {
  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="add-new-post-container">
        <h3>Add New Post</h3>
        <div className="hr-line thin fad" />
        <input id="file-picker" type="file" />
        <label className="file-picker-label" htmlFor="file-picker">
          <i class="fas fa-image"></i>
        </label>
        <img src="" alt="" />
        <textarea id="post-caption" placeholder="Caption" row="3"></textarea>
        <button className="btn primary">Post</button>
        <button onClick={onCloseModal} className="btn-dismiss btn icon medium">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </Modal>
  );
};
export { AddNewPostModal };
