import './Followings.css';
import { FollowingCard, Header, LoadingSpinner } from '../../components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Followings = props => {
  const [followings, setFollowings] = useState([]);
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, [userId]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Header />

      <main className="main-followings">
        <h2>Followings</h2>
        <div className="hr-line thin fad"></div>
        {Boolean(followings.length) ? (
          followings.map(following => (
            <FollowingCard key={following._id} userData={following} />
          ))
        ) : (
          <p className="no-following-text">Not Following Anyone</p>
        )}
      </main>
    </>
  );
};
export { Followings };
