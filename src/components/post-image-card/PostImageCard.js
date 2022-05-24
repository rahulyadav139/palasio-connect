import './PostImageCard.css';
import { useDispatch } from 'react-redux';
import { deleteAPost } from '../../store/post-slice';
import { removeASavedPost } from '../../store/user-slice';
import { Link } from 'react-router-dom';
import { ToastActions } from '../../store/toast-slice';

const PostImageCard = ({ post, isUserLoggedIn, isSavedPost, setUserData }) => {
  const { imageUrl, likes, comments, _id } = post;

  const dispatch = useDispatch();

  const totalLikes = likes.length;
  const totalComments = comments.length;

  const userActionHandler = () => {
    dispatch(isSavedPost ? removeASavedPost(_id) : deleteAPost(_id)).then(() =>
      dispatch(
        ToastActions.setToast({
          type: 'success',
          message: 'Post removed!',
        })
      )
    );
  };

  return (
    <div className="post-image-card">
      <img src={imageUrl} alt={_id} loading="lazy" />

      <Link to={`/post/${_id}`}>
        <div className="post-details">
          <div>
            <div className="flex gap">
              <span className="icon primary medium">
                <i className="fas fa-heart"></i>
              </span>
              <span className="text-white">{totalLikes}</span>
            </div>
            <div className="flex gap">
              <span className="icon primary medium">
                <i className="fas fa-comment"></i>
              </span>
              <span className="text-white">{totalComments}</span>
            </div>
          </div>
        </div>
      </Link>
      {isUserLoggedIn && (
        <button
          onClick={userActionHandler}
          className="btn primary icon small btn-delete"
        >
          <i className="fas fa-trash"></i>
        </button>
      )}
    </div>
  );
};
export { PostImageCard };
