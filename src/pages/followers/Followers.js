import './Followers.css';
import { FollowerCard, Header, LoadingSpinner } from '../../components';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Followers = props => {
  const [followers, setFollowers] = useState([]);
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const url =
        process.env.REACT_APP_BACKEND_URL + '/user/get-followers/' + userId;

      try {
        const { data } = await axios.get(url);
        setFollowers(data.followers);
      } catch (err) {
        console.log(err);
      }
    })();
    setIsLoading(false);
  }, [userId]);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Header />
      <main className="main-followers">
        <h2>Followers</h2>
        <div className="hr-line thin fad"></div>
        {Boolean(followers.length) ? (
          followers.map(follower => (
            <FollowerCard key={follower._id} userData={follower} />
          ))
        ) : (
          <p className="text-center no-follower-text">No Follower</p>
        )}
      </main>
    </>
  );
};
export { Followers };
