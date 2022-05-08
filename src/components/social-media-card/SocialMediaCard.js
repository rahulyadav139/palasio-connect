import './SocialMediaCard.css';
import { useSelector } from 'react-redux';
import { useFetch } from '../../hooks';

const SocialMediaCard = ({ post, updatePosts }) => {
  const { sendData } = useFetch();
  const userId = useSelector(state => state.user.userId);
  const {
    imageUrl,
    likes,
    caption,
    author: { fullName, avatarUrl },
    comments,
    createdAt,
    _id,
  } = post;

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
        <button onClick={addToLikeHandler} class="btn icon medium primary">
          {!likes.includes(userId) ? (
            <i class="far fa-heart"></i>
          ) : (
            <i style={{ color: 'red' }} class="fas fa-heart"></i>
          )}
        </button>
        <button class="btn icon medium primary">
          <i class="far fa-comment"></i>
        </button>
        <button class="btn icon medium primary">
          <i class="bi bi-bookmark"></i>
        </button>
      </div>
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
