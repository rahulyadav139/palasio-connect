import './Followers.css';
import { FollowerCard, Header } from '../../components';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import axios from 'axios';

const Followers = props => {
  const [followers, setFollowers] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
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
  }, []);

  return (
    <>
      <Header />
      <main className="main-followers">
        <h2>Followers</h2>
        <div className="hr-line thin fad"></div>
        {followers.map(follower => (
          <FollowerCard key={follower._id} userData={follower} />
        ))}
      </main>
    </>
  );
};
export { Followers };
