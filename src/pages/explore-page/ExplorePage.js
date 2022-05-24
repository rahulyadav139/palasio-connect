import './ExplorePage.css';
import { Header, ExploreImageCard, PostImageCard } from '../../components';

const ExplorePage = props => {
  return (
    <>
      <Header />
      <main className="main-explore-page">
        {Array.from({ length: 5 }).map(el => (
          <ExploreImageCard />
        ))}
      </main>
    </>
  );
};
export { ExplorePage };
