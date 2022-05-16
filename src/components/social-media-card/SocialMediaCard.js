import './SocialMediaCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../../store/user-slice';
import { useFetch } from '../../hooks';
import { dateFormatter } from '../../utils';
import { useRef } from 'react';
import { v4 as uuid } from 'uuid';
import {
  getPosts,
  likeAPost,
  removeLikeFromAPost,
  addAComment,
} from '../../store/post-slice';
import { saveAPost, removeASavedPost } from '../../store/user-slice';
import { Link } from 'react-router-dom';
import { timeDifferenceFun } from '../../utils/time-difference';

const SocialMediaCard = ({ post }) => {
  const { userId, savedPosts } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const commentInputRef = useRef();

  const {
    imageUrl,
    likes,
    caption,
    author: { fullName, avatarUrl, username, _id: authorId },
    comments,
    createdAt,
    _id,
  } = post;

  const isUserCommented = comments.some(comment => comment.user._id === userId);

  const likeAPostHandler = () => {
    !likes?.includes(userId)
      ? dispatch(likeAPost(_id))
      : dispatch(removeLikeFromAPost(_id));
  };

  const saveAPostHandler = () => {
    !savedPosts?.includes(_id)
      ? dispatch(saveAPost(_id))
      : dispatch(removeASavedPost(_id));
  };

  const commentOnAPostHandler = () => {
    const userComment = commentInputRef.current.value;

    const commentData = {
      postId: _id,
      comment: userComment,
    };

    dispatch(addAComment(commentData));

    dispatch(getPosts());

    commentInputRef.current.value = '';
  };

  return (
    <div className="card shadow social">
      <div className="flex space-between align-center">
        <div className="flex gap align-center">
          <div className="avatar small">
            {avatarUrl ? (
              <img
                src={process.env.REACT_APP_BACKEND_URL + '/' + avatarUrl}
                alt={fullName}
                loading="lazy"
              />
            ) : (
              fullName[0]
            )}
          </div>
          <div className="flex col">
            <Link to={`/profile/${authorId}`}>
              <div className="user">{fullName}</div>
            </Link>
            <div className="time">{timeDifferenceFun(createdAt)}</div>
          </div>
        </div>
        <button className="btn icon medium primary">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>
      <div className="image">
        <img
          className="img-responsive"
          src={process.env.REACT_APP_BACKEND_URL + '/' + imageUrl}
          alt={caption}
          loading="lazy"
        />
      </div>
      <div className="actions flex gap">
        <button onClick={likeAPostHandler} className="btn icon medium primary">
          {!likes?.includes(userId) ? (
            <i className="far fa-heart"></i>
          ) : (
            <i style={{ color: 'red' }} className="fas fa-heart"></i>
          )}
        </button>
        <button className="btn icon medium primary">
          {isUserCommented ? (
            <i className="fas fa-comment"></i>
          ) : (
            <i className="far fa-comment"></i>
          )}
        </button>
        <button onClick={saveAPostHandler} className="btn icon medium primary">
          {!savedPosts?.includes(_id) ? (
            <i className="bi bi-bookmark"></i>
          ) : (
            <i className="bi bi-bookmark-fill"></i>
          )}
        </button>
      </div>

      <p className="text-grey">{`${likes.length} ${
        likes.length > 1 ? 'likes' : 'like'
      } and ${comments.length} ${
        comments.length > 1 ? 'comments' : 'comment'
      }`}</p>

      <p className="text-bold">{caption}</p>

      {[...comments]
        .reverse()
        .slice(0, 2)
        .map(commentData => (
          <div key={uuid()} className="flex gap">
            <p className="text-bold">{commentData.user.username}</p>
            <p>{commentData.comment}</p>
          </div>
        ))}
      {comments.length > 2 && (
        <Link to={`/post/${_id}`}>
          <p className="text-grey cursor-pointer">See all</p>
        </Link>
      )}
      <div className="hr-line thin solid grey"></div>
      <div className="comment-actions">
        <input ref={commentInputRef} placeholder="Add a comment" />
        <button onClick={commentOnAPostHandler}>Comment</button>
      </div>
    </div>
  );
};
export { SocialMediaCard };
