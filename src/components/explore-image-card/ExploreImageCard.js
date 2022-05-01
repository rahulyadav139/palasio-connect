import './ExploreImageCard.css';

const ExploreImageCard = props => {
  return (
    <div className="explore-image-card">
      <img
        className="img-responsive"
        src="https://i.picsum.photos/id/964/536/354.jpg?hmac=kSsVnNTQ-6YWbc0xplnRuTFw1jcas7pI1MYuDRsMvQI"
        alt="sample"
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
    </div>
  );
};
export { ExploreImageCard };
