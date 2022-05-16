import './NotificationModal.css';
import { Modal } from '../ui/modal/Modal';
import { useSelector } from 'react-redux';
import { Notification } from '../notification/Notification';
import { useDispatch } from 'react-redux';
import { clearNotifications } from '../../store/user-slice';

const NotificationModal = ({ onCloseModal }) => {
  const { notifications } = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="flex space-between">
        <h3>Notifications</h3>
        <button onClick={onCloseModal} className="btn-dismiss btn icon medium">
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="hr-line thin fad" />

      <div className="notification-container">
        {Boolean(notifications.length) && (
          <div className="flex end">
            <p
              onClick={() => dispatch(clearNotifications())}
              className="text-bold cursor-pointer btn-clear"
            >
              Clear all
            </p>
          </div>
        )}
        {notifications.map(notification => (
          <Notification notification={notification} />
        ))}
        {!Boolean(notifications.length) && (
          <p className="text-center text-bold">No Notification</p>
        )}
      </div>
    </Modal>
  );
};
export { NotificationModal };
