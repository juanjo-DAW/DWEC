import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import Home from "./view/home.js";
import NewObjective from "./view/newObjective.js"
import EditObjective from "./view/editObjective.js"
import ShowObjective from "./view/showObjective.js"
import DeleteObjective from "./view/deleteObjective.js"

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Reminder</NavLink>
          </li>
          <li>
            <NavLink to="/new-objective">New Objective</NavLink>
          </li>
          <li>
            <NavLink to="/edit-objective/{id-objective}">Edit Objective</NavLink>
          </li>
          <li>
            <NavLink to="/show-objective/{id-objective}">Show Objective</NavLink>
          </li>
          <li>
            <NavLink to="/delete-objective/{id-objective}">Delete Objective</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/new-objective" element={<NewObjective />} />
        <Route path="/edit-objective" element={<EditObjective />} />
        <Route path="/show-objective" element={<ShowObjective />} />
        <Route path="/delete-objective" element={<DeleteObjective />} />
      </Routes>
    </Router>
  );
}
export default App;