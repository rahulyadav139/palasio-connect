import './Notification.css';
import { timeDifferenceFun } from '../../utils';
const Notification = ({ notification }) => {
  const {
    user: { avatarUrl, fullName, _id },
    time,
  } = notification;

  return (
    <div className="notification">
      <div className="avatar small">
        {avatarUrl ? <img src={avatarUrl} alt={_id} /> : fullName[0]}
      </div>

      <div>
        <h5 className="notification-title">{`${fullName} is started following you`}</h5>
        <p className="notification-details">
          <i className="fas fa-user-plus"></i>
          {` ${timeDifferenceFun(time)}`}
        </p>
      </div>
    </div>
  );
};
export { Notification };
