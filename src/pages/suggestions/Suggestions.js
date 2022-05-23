import './Suggestions.css';
import { SuggestionCard, Header } from '../../components';

const Suggestions = props => {
  return (
    <>
      <Header />
      <main className="main-suggestions">
        {Array.from({ length: 15 }).map(card => (
          <SuggestionCard />
        ))}
      </main>
    </>
  );
};
export { Suggestions };
