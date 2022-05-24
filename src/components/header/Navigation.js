import './Navigation.css';
import { Notification } from '../notification/Notification';
import { Link } from 'react-router-dom';

const Navigation = ({ onAddNewPost }) => {
  return (
    <nav>
      <ul className="list-items">
        <Link to="/">
          <li className="list-item">
            <button className="btn icon primary medium">
              <i class="fas fa-home"></i>
            </button>
          </li>
        </Link>
        <li className="list-item">
          <button onClick={onAddNewPost} className="btn icon primary medium">
            <i class="bi bi-plus-square"></i>
          </button>
        </li>

        <Link to="/explore">
          <li className="list-item">
            <button className="btn icon primary medium">
              <i class="fas fa-compass"></i>
            </button>
          </li>
        </Link>

        <li className=" list-item notification-items">
          <div class="badge-container">
            <button class="btn icon medium primary badge-counter test">
              <i class="fas fa-bell"></i>
            </button>
            {/* <span class="badge-number">10</span> */}
            <div className="notification-container">
              <div className="flex end">
                <p className="text-bold">Clear all</p>
              </div>
              {Array.from({ length: 5 }).map(notification => (
                <Notification />
              ))}
            </div>
          </div>
        </li>
        <Link to="/profile">
          <li className=" list-item cursor-pointer flex align-center">
            <div class="avatar small">
              <img src="https://picsum.photos/536/354" alt="sample" />
            </div>
            {/* <i class="fas fa-caret-down"></i> */}
          </li>
        </Link>
      </ul>
    </nav>
  );
};
export { Navigation };
