import './SocialMediaCard.css';

const SocialMediaCard = ({ post }) => {
  const {
    imageUrl,
    likes,
    caption,
    author: { fullName, avatarUrl },
    comments,
    createdAt,
  } = post;
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
        <button class="btn icon medium primary">
          <i class="far fa-heart"></i>
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
