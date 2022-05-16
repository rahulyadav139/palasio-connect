import './FollowerCard.css';

import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../../store/user-slice';
import { Link } from 'react-router-dom';
import { addToFollowings, removeFromFollowings } from '../../store/user-slice';

const FollowerCard = ({ userData: { avatarUrl, username, fullName, _id } }) => {
  const dispatch = useDispatch();

  const { followings } = useSelector(state => state.user);
  const isInFollowings = followings.includes(_id);

  const followingsHandler = () => {
    isInFollowings
      ? dispatch(removeFromFollowings(_id))
      : dispatch(addToFollowings(_id));
  };
  return (
    <div className=" follower-card ">
      <div className="avatar small">
        {avatarUrl ? (
          <img
            src={process.env.REACT_APP_BACKEND_URL + '/' + avatarUrl}
            alt={fullName}
          />
        ) : (
          fullName[0]
        )}
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
        {isInFollowings ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};
export { FollowerCard };
