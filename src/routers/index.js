import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Signup from "../screens/Signup";
import Todo from "../screens/Todo";

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/todo" component={Todo} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default MainRouter;
