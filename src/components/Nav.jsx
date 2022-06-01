import { Link } from "react-router-dom";

import '../css/nav.css'

function Nav() {
    return (
      <nav className="nav_main">
        <Link to="/">
          <span>Home</span>
        </Link>
        <Link to="/Dog_List">
          <span>Dogs List</span>
        </Link>
        <Link to="/Create_Dog">
          <span>Dog Creation</span>
        </Link>
      </nav>
    );
}
  
export default Nav;