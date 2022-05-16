import './Followings.css';
import { FollowingCard, Header } from '../../components';
import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import axios from 'axios';

const Followings = props => {
  const [followings, setFollowings] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    (async () => {
      const url =
        process.env.REACT_APP_BACKEND_URL + '/user/get-followings/' + userId;

      try {
        const { data } = await axios.get(url);
        setFollowings(data.followings);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <Header />

      <main className="main-followings">
        <h2>Followings</h2>
        <div className="hr-line thin fad"></div>
        {followings.map(following => (
          <FollowingCard key={following._id} userData={following} />
        ))}
      </main>
    </>
  );
};
export { Followings };
