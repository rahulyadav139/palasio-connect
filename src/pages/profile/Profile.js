import './Profile.css';
import { Header, PostImageCard, EditUserProfileModal } from '../../components';
import { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

import { AuthActions } from '../../store/auth-slice';
import axios from 'axios';

const Profile = props => {
  const [tab, setTab] = useState('posts');

  const [userData, setUserData] = useState({});

  const { userId: loggedInUser, savedPosts } = useSelector(state => state.user);
  const { posts } = useSelector(state => state.post);
  const { token } = useSelector(state => state.auth);

  const totalPosts = posts.length;
  const totalSavedPosts = savedPosts.length;

  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserLoggedIn = loggedInUser === userId;

  useEffect(() => {
    (async () => {
      const url =
        process.env.REACT_APP_BACKEND_URL + '/user/get-data/' + userId;

      try {
        const { data } = await axios.get(url);
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [totalPosts, totalSavedPosts]);

  const logoutUserHandler = () => {
    dispatch(AuthActions.logoutUser());

    navigate('/');
  };

  if (!userData.fullName) return <></>;
  return (
    <>
      <Header />
      <main className="main-profile-page">
        <div className="profile-section">
          <div className="avatar large">
            {userData.avatarUrl ? (
              <img
                src={
                  process.env.REACT_APP_BACKEND_URL + '/' + userData.avatarUrl
                }
                alt={userData.fullName}
              />
            ) : (
              userData.fullName[0]
            )}
          </div>

          <div className="flex col gap">
            <div className="flex gap align-center">
              <h1>{userData.fullName}</h1>
              {isUserLoggedIn && (
                <Link to="/account/edit-profile">
                  <button
                    title="Edit Profile"
                    className="btn icon primary medium"
                  >
                    <i className="fas fa-user-cog"></i>
                  </button>
                </Link>
              )}

              {isUserLoggedIn && (
                <button
                  onClick={logoutUserHandler}
                  title="Sign Out"
                  className="btn icon primary medium"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              )}
            </div>

            <div className="profile-stats flex space-between">
              <div className="flex col ">
                <p className="text-center text-bold text-large">
                  {userData.posts.length}
                </p>
                <p>Posts</p>
              </div>
              <Link to={`/profile/${userId}/followers`}>
                <div>
                  <p className="text-center text-bold text-large">
                    {userData.followers.length}
                  </p>
                  <p>Followers</p>
                </div>
              </Link>
              <Link to={`/profile/${userId}/followings`}>
                <div>
                  <p className="text-center text-bold text-large">
                    {userData.followings.length}
                  </p>
                  <p>Following</p>
                </div>
              </Link>
            </div>
            <p>{userData.bio ?? ''}</p>
            <p className="text-bold text-primary-dark">
              {userData.website ?? ''}
            </p>
          </div>
        </div>
        <div className="hr-line thin solid grey"></div>
        <div className="tab-actions">
          <button
            className={tab === 'posts' ? 'active-tab' : ''}
            onClick={() => setTab('posts')}
          >
            <i className="fas fa-table"></i> Posts
          </button>
          <button
            className={tab === 'saved' ? 'active-tab' : ''}
            onClick={() => setTab('saved')}
          >
            <i className="fas fa-bookmark"></i> Saved
          </button>
        </div>
        {tab === 'posts' && (
          <div className="posts-container">
            {userData.posts?.map(post => (
              <PostImageCard
                key={post._id}
                post={post}
                isUserLoggedIn={isUserLoggedIn}
                isSavedPost={false}
              />
            ))}
          </div>
        )}

        {tab === 'saved' && (
          <div className="posts-container">
            {userData.savedPosts?.map(post => (
              <PostImageCard
                key={post._id}
                post={post}
                isUserLoggedIn={isUserLoggedIn}
                isSavedPost={true}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
};
export { Profile };
