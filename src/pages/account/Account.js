import './Account.css';
import {
  EditProfile,
  Header,
  ChangePassword,
  DeleteAccount,
} from '../../components';
import { NavLink, Routes, Route } from 'react-router-dom';

const Account = props => {
  return (
    <>
      <Header />
      <main className="main-account">
        <div className="account-sidebar">
          <ul>
            <NavLink
              className={({ isActive }) => (isActive ? 'active-tab' : '')}
              to="edit-profile"
            >
              <li>Edit Profile</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'active-tab' : '')}
              to="change-password"
            >
              <li>Change Password</li>
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? 'active-tab' : '')}
              to="delete-account"
            >
              <li>Delete Account</li>
            </NavLink>
          </ul>
        </div>
        <div className="account-section">
          <Routes>
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="delete-account" element={<DeleteAccount />} />
          </Routes>
        </div>
      </main>
    </>
  );
};
export { Account };
