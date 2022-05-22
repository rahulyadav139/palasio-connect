import './Navigation.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { AddNewPostModal } from '../../components';
import { NotificationModal } from '../notification-modal/NotificationModal';

const Navigation = () => {
  const [isAddNewPostModal, setIsAddNewPostModal] = useState(false);
  const [isNotificationModal, setIsNotificationModal] = useState(false);
  const { userId, avatarUrl, fullName, notifications } = useSelector(
    state => state.user
  );

  return (
    <>
      <nav>
        <ul className="list-items">
          <Link to="/">
            <li className="list-item">
              <button className="btn icon primary medium">
                <i className="fas fa-home"></i>
              </button>
            </li>
          </Link>
          <li className="list-item">
            <button
              onClick={() => setIsAddNewPostModal(true)}
              className="btn icon primary medium"
            >
              <i className="bi bi-plus-square"></i>
            </button>
          </li>

          <Link to="/explore">
            <li className="list-item">
              <button className="btn icon primary medium">
                <i className="fas fa-compass"></i>
              </button>
            </li>
          </Link>

          <li className=" list-item notification-items">
            <div className="badge-container">
              <button
                onClick={() => setIsNotificationModal(true)}
                className="btn icon medium primary badge-counter test"
              >
                <i className="fas fa-bell"></i>
              </button>
              {notifications.length !== 0 && (
                <span className="badge-number">{notifications.length}</span>
              )}
            </div>
          </li>
          <Link to={`/profile/${userId}`}>
            <li className=" list-item cursor-pointer flex align-center">
              <div className="avatar small">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={userId} loading="lazy" />
                ) : (
                  fullName[0]
                )}
              </div>
            </li>
          </Link>
        </ul>
      </nav>
      {isAddNewPostModal && (
        <AddNewPostModal onCloseModal={() => setIsAddNewPostModal(false)} />
      )}
      {isNotificationModal && (
        <NotificationModal onCloseModal={() => setIsNotificationModal(false)} />
      )}
    </>
  );
};
export { Navigation };
