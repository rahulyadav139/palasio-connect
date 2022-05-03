import './Homepage.css';
import {
  Header,
  SocialMediaCard,
  SuggestionCard,
  AddNewPostModal,
} from '../../components';
import { useState } from 'react';

const Homepage = props => {
  const [isAddNewPostModal, setIsAddNewPostModal] = useState(false);
  return (
    <>
      <Header onAddNewPost={() => setIsAddNewPostModal(true)} />
      <main className="main-homepage">
        <div className="social-media-cards-container">
          {Array.from({ length: 5 }).map(card => (
            <SocialMediaCard />
          ))}
        </div>

        <div className="suggestion-container">
          <div className="flex space-between">
            <h4 className="text-grey">Suggestions For You</h4>
            <button className="btn-see-all">See All</button>
          </div>
          <div className="hr-line thin solid grey"></div>
          {Array.from({ length: 5 }).map(card => (
            <SuggestionCard />
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
