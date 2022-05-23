import './PostImageCard.css';

const PostImageCard = props => {
  return (
    <div className="post-image-card">
      <img
        src="https://i.picsum.photos/id/933/536/354.jpg?hmac=8lVRoNcysARFInMz443q-mc0wbgwHbJgFe5ChEo-YaQ"
        alt=""
      />

      <div className="post-details">
        <div>
          <div className="flex gap">
            <span className="icon primary medium">
              <i class="fas fa-heart"></i>
            </span>
            <span className="text-white">123</span>
          </div>
          <div className="flex gap">
            <span className="icon primary medium">
              <i class="fas fa-comment"></i>
            </span>
            <span className="text-white">123</span>
          </div>
        </div>
      </div>
      <button className="btn primary icon small btn-delete">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  );
};
export { PostImageCard };
