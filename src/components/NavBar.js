import "../style/NavBar.css";

function Navbar() {
  return (
    <div className="center">
      <br />
      <h1 className="shadow"> Unit-Computer </h1>
      <nav className="center">
        <ul>
          <li>
            <a href="/">Sign out</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
