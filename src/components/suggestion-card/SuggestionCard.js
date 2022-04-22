import './SuggestionCard.css';

const SuggestionCard = props => {
  return (
    <div className=" suggestion-card ">
      <div className="avatar small">
        <img
          src="https://i.picsum.photos/id/933/536/354.jpg?hmac=8lVRoNcysARFInMz443q-mc0wbgwHbJgFe5ChEo-YaQ"
          alt=""
        />
      </div>
      <div>
        <h5>rahulyadav139</h5>
        <h5 className="text-grey">Rahul Yadav</h5>
      </div>
      <button className="btn-follow">Follow</button>
    </div>
  );
};
export { SuggestionCard };
