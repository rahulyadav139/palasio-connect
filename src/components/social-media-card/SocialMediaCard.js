import './SocialMediaCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../../store/user-slice';
import { useFetch } from '../../hooks';
import { dateFormatter } from '../../utils';
import { useRef } from 'react';

const SocialMediaCard = ({ post, updatePosts }) => {
  const { sendData } = useFetch();
  const { userId, saved } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const commentInputRef = useRef();

  const {
    imageUrl,
    likes,
    caption,
    author: { fullName, avatarUrl, username },
    comments,
    createdAt,
    _id,
  } = post;

  const isUserCommented = comments.some(comment => comment.user === userId);

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

  const commentOnAPostHandler = async () => {
    const userComment = commentInputRef.current.value;

    const { data, error, status } = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/post/comment-on-a-post',
      'POST',
      {
        postId: _id,
        comment: userComment,
      },
      true
    );

    if (error) return;

    dispatch(UserActions.updatePosts());

    commentInputRef.current.value = '';

    setTimeout(() => {
      dispatch(UserActions.updatePosts());
    }, 500);
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
            <div class="time">{dateFormatter(createdAt)}</div>
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
          {isUserCommented ? (
            <i class="fas fa-comment"></i>
          ) : (
            <i class="far fa-comment"></i>
          )}
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
      <div className="flex gap">
        <p className="text-bold">{username}</p>
        <p>{caption}</p>
      </div>

      {comments.slice(0, 2).map(commentData => (
        <div className="flex gap">
          <p className="text-bold">{commentData.user.username}</p>
          <p>{commentData.comment}</p>
        </div>
      ))}
      <p className="text-grey cursor-pointer">See all</p>
      <div className="hr-line thin solid grey"></div>
      <div className="comment-actions">
        <input ref={commentInputRef} placeholder="Add a comment" />
        <button onClick={commentOnAPostHandler}>Comment</button>
      </div>
    </div>
  );
};
export { SocialMediaCard };
