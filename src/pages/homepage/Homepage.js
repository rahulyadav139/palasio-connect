import './Homepage.css';
import { Header, SocialMediaCard, FollowerCard } from '../../components';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getUser, getSuggestions } from '../../store/user-slice';
import { getPosts } from '../../store/post-slice';

const Homepage = props => {
  const dispatch = useDispatch();
  const { suggestions, fullName } = useSelector(state => state.user);
  const posts = useSelector(state => state.post.posts);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getSuggestions());
    dispatch(getPosts());
  }, [dispatch]);

  if (!fullName) return <></>;

  return (
    <>
      <Header />
      <main className="main-homepage">
        <div className="social-media-cards-container">
          {[...posts].reverse().map(post => (
            <SocialMediaCard key={post._id} post={post} />
          ))}
          {!Boolean(posts.length) && (
            <p className="text-center text-bold">No Posts</p>
          )}
        </div>

        <div className="suggestion-container">
          <div className="flex space-between">
            <h4 className="text-grey">Suggestions For You</h4>
            <Link to="/suggestions">
              <button className="btn-see-all">See All</button>
            </Link>
          </div>
          <div className="hr-line thin solid grey"></div>
          {suggestions.map(suggestion => (
            <FollowerCard key={suggestion._id} userData={suggestion} />
          ))}
        </div>
      </main>
    </>
  );
};
export { Homepage };
