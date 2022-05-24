import './ExplorePage.css';
import { Header, ExploreImageCard, LoadingSpinner } from '../../components';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ExplorePage = props => {
  const [explorePosts, setExplorePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const url = process.env.REACT_APP_BACKEND_URL + '/user/explore-posts';

      try {
        const { data } = await axios.get(url);
        setExplorePosts(data);
      } catch (err) {
        console.log(err);
      }
    })();
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <Header />
      <main className="main-explore-page">
        <h2>Explore</h2>
        <div className="hr-line thin fad"></div>
        <div className="explore-posts-container">
          {Boolean(explorePosts.length) ? (
            explorePosts.map(post => (
              <ExploreImageCard key={post._id} post={post} />
            ))
          ) : (
            <p className="text-center">No Posts</p>
          )}
        </div>
      </main>
    </>
  );
};
export { ExplorePage };
