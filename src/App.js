import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Posts from "./components/Posts/Posts";
import PostsDetails from "./components/PostsDetails/PostsDetails";
import Users from "./components/Users/Users";

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Users/>
      </Route>
      <Route path="/posts/:id" exact>
        <PostsDetails/>
      </Route>
      <Route path="/posts" exact>
        <Posts/>
      </Route>
    </Router>
  );
}

export default App;
