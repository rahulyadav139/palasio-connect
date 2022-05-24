import './Profile.css';
import { Header, PostImageCard, EditUserProfileModal } from '../../components';
import { useState, useEffect } from 'react';
import { useFetch } from '../../hooks';
import { getFCP } from 'web-vitals';

const Profile = props => {
  const [tab, setTab] = useState('posts');
  const [isEditProfileModal, setIsEditProfileModal] = useState(false);
  const { getData } = useFetch();
  const [saved, setSaved] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, error, status } = await getData(
        process.env.REACT_APP_BACKEND_URL + '/post/get-all-user-posts',
        true
      );

      console.log(data);

      setPosts(data.posts);
      setSaved(data.saved);
    })();
  }, []);
  return (
    <>
      <Header />
      <main className="main-profile-page">
        <div className="profile-section">
          <div className="avatar large">
            <img
              src="https://i.picsum.photos/id/933/536/354.jpg?hmac=8lVRoNcysARFInMz443q-mc0wbgwHbJgFe5ChEo-YaQ"
              alt="user"
            />
          </div>

          <div className="flex col gap">
            <div className="flex gap align-center">
              <h1>Rahul Yadav</h1>
              <button
                onClick={() => setIsEditProfileModal(true)}
                title="Edit Profile"
                className="btn icon primary medium"
              >
                <i class="fas fa-user-cog"></i>
              </button>

              <button title="Sign Out" className="btn icon primary medium">
                <i class="fas fa-sign-out-alt"></i>
              </button>
            </div>

            <div className="profile-stats flex space-between">
              <div>
                <p className="text-center text-bold text-large">14</p>
                <p>Posts</p>
              </div>
              <div>
                <p className="text-center text-bold text-large">14</p>
                <p>Followers</p>
              </div>
              <div>
                <p className="text-center text-bold text-large">14</p>
                <p>Following</p>
              </div>
            </div>
            <p>
              Lorem ipsum is a placeholder text
              <br />
              Lorem ipsum is a placeholder text
              <br />
              Lorem ipsum is a placeholder text
              <br />
              Lorem ipsum is a placeholder text
              <br />
              Lorem ipsum is a placeholder text
              <br />
            </p>
          </div>
        </div>
        <div className="hr-line thin solid grey"></div>
        <div className="tab-actions">
          <button
            className={tab === 'posts' ? 'active-tab' : ''}
            onClick={() => setTab('posts')}
          >
            <i class="fas fa-table"></i> Posts
          </button>
          <button
            className={tab === 'saved' ? 'active-tab' : ''}
            onClick={() => setTab('saved')}
          >
            <i class="fas fa-bookmark"></i> Saved
          </button>
        </div>
        {tab === 'posts' && (
          <div className="posts-container">
            {posts.map(post => (
              <PostImageCard />
            ))}
          </div>
        )}
        {tab === 'saved' && (
          <div className="posts-container">
            {saved.map(post => (
              <PostImageCard />
            ))}
          </div>
        )}
      </main>
      {isEditProfileModal && (
        <EditUserProfileModal closeModal={() => setIsEditProfileModal(false)} />
      )}
    </>
  );
};
export { Profile };
