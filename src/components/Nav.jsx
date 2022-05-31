import { Link } from "react-router-dom";

import '../css/nav.css'

function Nav() {
    return (
      <nav className="nav_main">
        <Link to="/apiDogs">
          <span>Home</span>
        </Link>
        <Link to="/apiDogs/Dog_List">
          <span>Dogs List</span>
        </Link>
        <Link to="/apiDogs/Create_Dog">
          <span>Dog Creation</span>
        </Link>
      </nav>
    );
}
  
export default Nav;