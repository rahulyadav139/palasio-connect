import './SinglePost.css';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAPost } from '../../store/post-slice';
import { Header, LoadingSpinner } from '../../components';
import { dateFormatter } from '../../utils';
import { Link } from 'react-router-dom';
import { addAComment } from '../../store/post-slice';

const SinglePost = props => {
  const commentInputRef = useRef();

  const {
    post: { caption, imageUrl, comments, author, createdAt },
  } = useSelector(state => state.post);

  const dispatch = useDispatch();

  const { postId } = useParams();

  useEffect(() => {
    dispatch(getAPost(postId));
  }, [dispatch, postId]);

  if (!imageUrl) return <LoadingSpinner />;

  const { fullName, _id: authorId, avatarUrl } = author;

  const commentOnAPostHandler = () => {
    const userComment = commentInputRef.current.value;

    const commentData = {
      postId,
      comment: userComment,
    };

    dispatch(addAComment(commentData));

    dispatch(getAPost(postId));

    commentInputRef.current.value = '';
  };

  return (
    <>
      <Header />
      <main className="main-single-page">
        <div className="post-media-data">
          <div className="flex space-between align-center">
            <div className="flex gap align-center">
              <div className="avatar small">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={fullName} />
                ) : (
                  fullName[0]
                )}
              </div>
              <div className="flex col">
                <Link to={`/profile/${authorId}`}>
                  <div className="user text-bold">{fullName}</div>
                </Link>
                <div className="time">{dateFormatter(createdAt)}</div>
              </div>
            </div>
          </div>
          <div className="post-image-container">
            <img className="img-responsive" src={imageUrl} alt={postId} />
          </div>
          <p></p>
        </div>
        <div className="comments-container">
          <p className="text-bold caption-text">Caption</p>
          <p>{caption}</p>
          <div className="hr-line thin fad"></div>
          <div className="comment-actions">
            <input ref={commentInputRef} placeholder="Add a comment" />
            <button onClick={commentOnAPostHandler}>Comment</button>
          </div>

          {[...comments].reverse().map(commentData => (
            <div className="flex gap" key={commentData._id}>
              <Link to={`/profile/${commentData.user._id}`}>
                <p className="text-bold text-username">
                  {commentData.user.username}
                </p>
              </Link>
              <p>{commentData.comment}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
export { SinglePost };
