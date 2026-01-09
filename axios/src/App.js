import './App.css';
import Posts from './Posts';
import Comments from './Comments';
import { Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
      {/* Navigation */}
      <nav className="nav">
        <NavLink to="/posts" className="nav-link">
          Posts
        </NavLink>

        <NavLink to="/comments" className="nav-link">
          Comments
        </NavLink>
      </nav>

      {/* Middle UI content */}
      <div className="content">
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
