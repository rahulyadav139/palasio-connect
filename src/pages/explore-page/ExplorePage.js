import './ExplorePage.css';
import { Header, ExploreImageCard, PostImageCard } from '../../components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ExplorePage = props => {
  const [explorePosts, setExplorePosts] = useState([]);

  useEffect(() => {
    (async () => {
      const url = process.env.REACT_APP_BACKEND_URL + '/user/explore-posts';

      try {
        const { data } = await axios.get(url);
        setExplorePosts(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <>
      <Header />
      <main className="main-explore-page">
        <h2>Explore</h2>
        <div className="hr-line thin fad"></div>
        <div className="explore-posts-container">
          {explorePosts.map(post => (
            <ExploreImageCard key={post._id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
};
export { ExplorePage };
