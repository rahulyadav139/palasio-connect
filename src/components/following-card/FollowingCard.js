import './FollowingCard.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToFollowings, removeFromFollowings } from '../../store/user-slice';

const FollowingCard = ({
  userData: { avatarUrl, username, fullName, _id },
}) => {
  const { followings } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const isInFollowings = followings.includes(_id);

  const followingsHandler = () => {
    isInFollowings
      ? dispatch(removeFromFollowings(_id))
      : dispatch(addToFollowings(_id));
  };
  return (
    <div className=" following-card ">
      <div className="avatar small">
        {avatarUrl ? <img src={avatarUrl} alt={fullName} /> : fullName[0]}
      </div>
      <div>
        <Link to={`/profile/${_id}`}>
          <h5>{username}</h5>
        </Link>
        <h5 className="text-grey">{fullName}</h5>
      </div>
      <button
        onClick={followingsHandler}
        className={isInFollowings ? 'btn-remove' : 'btn-follow'}
      >
        {isInFollowings ? 'Remove' : 'Follow'}
      </button>
    </div>
  );
};
export { FollowingCard };
