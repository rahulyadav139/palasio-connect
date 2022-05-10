import './Homepage.css';
import {
  Header,
  SocialMediaCard,
  SuggestionCard,
  AddNewPostModal,
} from '../../components';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks';
import { useSelector } from 'react-redux';

let isInitialized = false;

const Homepage = props => {
  const [isAddNewPostModal, setIsAddNewPostModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [posts, setPosts] = useState([]);
  const { getData } = useFetch();
  const { followings, totalPosts, updatePosts } = useSelector(
    state => state.user
  );

  const totalFollowings = followings.length;

  console.log('run');

  const getAllPosts = useCallback(() => {
    (async () => {
      const { data, error, status } = await getData(
        process.env.REACT_APP_BACKEND_URL + '/post/all',
        true
      );

      // console.log(data.posts);
      setPosts(data.posts);
    })();
  }, [getData]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  useEffect(() => {
    if (!updatePosts) return;

    getAllPosts();
  }, [updatePosts, getAllPosts]);

  useEffect(() => {
    (async () => {
      const { data, error, status } = await getData(
        process.env.REACT_APP_BACKEND_URL + '/user-suggestions',
        true
      );
      setSuggestions(data.suggestions);
    })();
  }, [totalFollowings]);

  return (
    <>
      <Header onAddNewPost={() => setIsAddNewPostModal(true)} />
      <main className="main-homepage">
        <div className="social-media-cards-container">
          {posts.map(post => (
            <SocialMediaCard post={post} updatePosts={setPosts} />
          ))}
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
            <SuggestionCard
              avatarUrl={suggestion.avatarUrl}
              username={suggestion.username}
              fullName={suggestion.fullName}
              _id={suggestion._id}
            />
          ))}
        </div>
        {isAddNewPostModal && (
          <AddNewPostModal onCloseModal={() => setIsAddNewPostModal(false)} />
        )}
      </main>
    </>
  );
};
export { Homepage };
