import './Notification.css';

const Notification = props => {
  return (
    <div class="notification">
      <div class="avatar small">
        <img src="https://picsum.photos/536/354" alt="sample" />
      </div>

      <div>
        <h5 class="notification-title">Mohit Yadav Wants to be Your Friend</h5>
        <p class="notification-details">
          <i class="fas fa-user-plus"></i> 25 min ago
        </p>
      </div>
    </div>
  );
};
export { Notification };
