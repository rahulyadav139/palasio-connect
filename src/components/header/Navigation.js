import './Navigation.css';

const Navigation = props => {
  return (
    <nav>
      <ul className="list-items">
        <li className="list-item">
          <button className="btn icon primary medium">
            <i class="bi bi-plus-square"></i>
          </button>
        </li>

        <li className=" list-item">
          <div class="badge-container">
            <button class="btn icon medium primary badge-counter">
              <i class="fas fa-bell"></i>
            </button>
            {/* <span class="badge-number">10</span> */}
          </div>
        </li>
        <li className=" list-item cursor-pointer ">
          <div class="avatar small">
            <img src="https://picsum.photos/536/354" alt="sample" />
          </div>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
