import './Suggestions.css';
import { FollowerCard, Header, LoadingSpinner } from '../../components';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Suggestions = props => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const url = process.env.REACT_APP_BACKEND_URL + '/user/get-suggestions';

      try {
        const { data } = await axios.get(url);
        setSuggestions(data.suggestions);
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
      <main className="main-suggestions">
        <h2>Suggestions</h2>
        <div className="hr-line thin fad"></div>
        {Boolean(suggestions.length) ? (
          suggestions.map(suggestion => (
            <FollowerCard key={suggestion._id} userData={suggestion} />
          ))
        ) : (
          <p className="text-bold text-center no-suggestion-text">
            No Suggestions
          </p>
        )}
      </main>
    </>
  );
};
export { Suggestions };
