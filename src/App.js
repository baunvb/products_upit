import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Booking from './product/bikerental/screen/Booking';
import { Provider } from "react-redux";
import { createStore } from "redux";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/bike_rental" component={Booking} key={1} />;
      </Switch>
    </Router>
  );
}

export default App;
