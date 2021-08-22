import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Signup from "../screens/Signup";
import Login from "../screens/Login";
import Todo from "../screens/Todo";

const MainRouter = () => {
  const auth = useAuth();

  if (auth.user.email) {
    return (
      <Router>
        <Switch>
          <Route path="/" component={Todo} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Redirect to="/signup" />
      </Switch>
    </Router>
  );
};

export default MainRouter;
