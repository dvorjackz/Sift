import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/navbar.component";
import Sift from "./components/sift.component";
import Rankings from "./components/rankings.component";
import CreateRushee from "./components/create-rushee.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={Sift} />
        <Route path="/rankings" exact component={Rankings} />
        <Route path="/create" exact component={CreateRushee} />
      </div>
    </Router>
  );
}

export default App;
