import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
  Homepage,
  AuthPage,
  Suggestions,
  Profile,
  Account,
  ExplorePage,
  Followers,
  Followings,
  SinglePost,
} from './pages';
import { useSelector } from 'react-redux';
import { Toast, PrivateRoutes } from './components';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AuthActions } from './store/auth-slice';
import { ToastActions } from './store/toast-slice';
import axios from 'axios';

function App() {
  const isAuth = useSelector(state => state.auth.isAuth);
  const { status } = useSelector(state => state.toast);
  const { userStatus } = useSelector(state => state.user);
  const { postStatus } = useSelector(state => state.post);

  const dispatch = useDispatch();

  useEffect(() => {
    const cookieArr = document.cookie.split(';').map(cookie => {
      const splitted = cookie.split('=');
      return { key: splitted[0], value: splitted[1] };
    });
    const token = cookieArr.find(
      cookieObject => cookieObject.key === 'token'
    )?.value;

    if (!token) return;

    dispatch(AuthActions.loginHandler(token));

    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }, [isAuth, dispatch]);

  useEffect(() => {
    if (userStatus === 'error' || postStatus === 'error') {
      dispatch(
        ToastActions.setToast({
          message: 'Something went wrong!',
          type: 'danger',
        })
      );
    }

    if (userStatus === 'logged-out' || postStatus === 'logged-out') {
      dispatch(AuthActions.logoutUser());
      dispatch(
        ToastActions.setToast({
          message: 'You have been logged out!',
          type: 'danger',
        })
      );
    }
  }, [userStatus, postStatus, dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isAuth ? <Homepage /> : <AuthPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/suggestions" element={<Suggestions />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/profile/:userId/followings" element={<Followings />} />
          <Route path="/profile/:userId/followers" element={<Followers />} />
          <Route path="/post/:postId" element={<SinglePost />} />
        </Route>
      </Routes>
      {status && <Toast />}
    </div>
  );
}

export default App;
