import './SocialMediaCard.css';

const SocialMediaCard = props => {
  return (
    <div class="card shadow social">
      <div class="flex space-between align-center">
        <div class="flex gap align-center">
          <div class="avatar small">
            <img
              src="https://i.picsum.photos/id/933/536/354.jpg?hmac=8lVRoNcysARFInMz443q-mc0wbgwHbJgFe5ChEo-YaQ"
              alt=""
            />
          </div>
          <div class="flex col">
            <div class="user">Michael</div>
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
          src="https://i.picsum.photos/id/933/536/354.jpg?hmac=8lVRoNcysARFInMz443q-mc0wbgwHbJgFe5ChEo-YaQ"
          alt=""
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
          <i class="fas fa-share-alt"></i>
        </button>
      </div>
      <p>sdfbsdfbsfbsfbsdfbsdfbsfb</p>
      <div className="hr-line thin solid grey"></div>
      <div className="comment-actions">
        <input placeholder="Add a comment" />
        <button>Comment</button>
      </div>
    </div>
  );
};
export { SocialMediaCard };
