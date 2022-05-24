import './ExploreImageCard.css';
import { Link } from 'react-router-dom';

const ExploreImageCard = ({ post }) => {
  const { _id, imageUrl, likes, comments } = post;

  const totalLikes = likes.length;
  const totalComments = comments.length;
  return (
    <Link to={`/post/${_id}`}>
      <div className="explore-image-card">
        <img className="img-responsive" src={imageUrl} alt={_id} />
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
      </div>
    </Link>
  );
};
export { ExploreImageCard };
