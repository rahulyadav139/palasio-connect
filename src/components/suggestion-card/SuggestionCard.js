import './SuggestionCard.css';

import { useFetch } from '../../hooks';
import { useDispatch } from 'react-redux';
import { UserActions } from '../../store/user-slice';

const SuggestionCard = ({ avatarUrl, username, fullName, _id }) => {
  const dispatch = useDispatch();
  const { sendData } = useFetch();
  const addToFollowingsHandler = async () => {
    const { data, error, status } = await sendData(
      process.env.REACT_APP_BACKEND_URL + '/add-to-followings',
      'POST',
      { newToFollowings: _id },
      true
    );

    if (error) return;

    dispatch(UserActions.addToFollowings(_id));
  };
  return (
    <div className=" suggestion-card ">
      <div className="avatar small">
        {avatarUrl ? <img src={avatarUrl} alt={fullName} /> : fullName[0]}
      </div>
      <div>
        <h5>{username}</h5>
        <h5 className="text-grey">{fullName}</h5>
      </div>
      <button onClick={addToFollowingsHandler} className="btn-follow">
        Follow
      </button>
    </div>
  );
};
export { SuggestionCard };
