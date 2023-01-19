import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Main</Link>
        </li>
        <li>
          <Link to={"/winners"}>Winners</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
