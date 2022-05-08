import './Homepage.css';
import {
  Header,
  SocialMediaCard,
  SuggestionCard,
  AddNewPostModal,
} from '../../components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks';

const Homepage = props => {
  const [isAddNewPostModal, setIsAddNewPostModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [posts, setPosts] = useState([]);
  const { getData } = useFetch();

  useEffect(() => {
    (async () => {
      const { data, error, status } = await getData(
        process.env.REACT_APP_BACKEND_URL + '/post/all',
        true
      );

      setPosts(data.posts);
    })();
    (async () => {
      const { data, error, status } = await getData(
        process.env.REACT_APP_BACKEND_URL + '/user-suggestions',
        true
      );

      setSuggestions(data.suggestions);
    })();
  }, []);

  return (
    <>
      <Header onAddNewPost={() => setIsAddNewPostModal(true)} />
      <main className="main-homepage">
        <div className="social-media-cards-container">
          {posts.map(post => (
            <SocialMediaCard />
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
