import './SocialMediaCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../../store/user-slice';
import { useFetch } from '../../hooks';

const SocialMediaCard = ({ post, updatePosts }) => {
  const { sendData } = useFetch();
  const { userId, saved } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const {
    imageUrl,
    likes,
    caption,
    author: { fullName, avatarUrl },
    comments,
    createdAt,
    _id,
  } = post;

  console.log(saved);

  const addToLikeHandler = async () => {
    const { data, error, status } = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/post/like-a-post',
      'POST',
      { postId: _id },
      true
    );

    if (error) return;

    updatePosts(prev =>
      prev.map(post =>
        post._id === _id ? { ...post, likes: likes.concat(userId) } : post
      )
    );
  };

  const removeLikeFromPostHandler = async () => {
    const { data, error, status } = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/post/remove-like',
      'POST',
      { postId: _id },
      true
    );

    if (error) return;

    updatePosts(prev =>
      prev.map(post =>
        post._id === _id
          ? { ...post, likes: likes.filter(id => id !== userId) }
          : post
      )
    );
  };

  const addToSavedHandler = async () => {
    const { data, error, status } = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/save-a-post',
      'POST',
      { postId: _id },
      true
    );

    if (error) return;

    dispatch(UserActions.saveAPost(_id));
  };
  const removeAPostFromSavedHandler = async () => {
    const { data, error, status } = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/remove-post-from-saved',
      'POST',
      { postId: _id },
      true
    );

    if (error) return;

    dispatch(UserActions.removeAPost(_id));
  };
  return (
    <div class="card shadow social">
      <div class="flex space-between align-center">
        <div class="flex gap align-center">
          <div class="avatar small">
            {avatarUrl ? (
              <img
                src={process.env.REACT_APP_BACKEND_URL + '/' + imageUrl}
                alt={fullName}
              />
            ) : (
              fullName[0]
            )}
          </div>
          <div class="flex col">
            <div class="user">{fullName}</div>
            <div class="time">Today</div>
          </div>
        </div>
        <button class="btn icon medium primary">
          <i class="fas fa-ellipsis-v"></i>
        </button>
      </div>
      <div class="image">
        <img
          class="img-responsive"
          src={process.env.REACT_APP_BACKEND_URL + '/' + imageUrl}
          alt={caption}
        />
      </div>
      <div class="actions flex gap">
        <button
          onClick={
            !likes.includes(userId)
              ? addToLikeHandler
              : removeLikeFromPostHandler
          }
          class="btn icon medium primary"
        >
          {!likes.includes(userId) ? (
            <i class="far fa-heart"></i>
          ) : (
            <i style={{ color: 'red' }} class="fas fa-heart"></i>
          )}
        </button>
        <button class="btn icon medium primary">
          <i class="far fa-comment"></i>
        </button>
        <button
          onClick={
            !saved.includes(_id)
              ? addToSavedHandler
              : removeAPostFromSavedHandler
          }
          class="btn icon medium primary"
        >
          {!saved.includes(_id) ? (
            <i class="bi bi-bookmark"></i>
          ) : (
            <i class="bi bi-bookmark-fill"></i>
          )}
        </button>
      </div>
      <p className="text-bold">{'test'}</p>
      <p>{caption}</p>
      <div className="hr-line thin solid grey"></div>
      <div className="comment-actions">
        <input placeholder="Add a comment" />
        <button>Comment</button>
      </div>
    </div>
  );
};
export { SocialMediaCard };
