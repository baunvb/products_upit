import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Booking from './product/bikerental/Booking';


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
