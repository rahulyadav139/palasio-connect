import './SuggestionCard.css';

const SuggestionCard = ({ avatarUrl, username, fullName }) => {
  return (
    <div className=" suggestion-card ">
      <div className="avatar small">
        {avatarUrl ? <img src={avatarUrl} alt={fullName} /> : fullName[0]}
      </div>
      <div>
        <h5>{username}</h5>
        <h5 className="text-grey">{fullName}</h5>
      </div>
      <button className="btn-follow">Follow</button>
    </div>
  );
};
export { SuggestionCard };
