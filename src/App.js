import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from "./components/Navbar";
import Sift from "./components/Sift";
import Rankings from "./components/Rankings";
import CreateRushee from "./components/Upload";

function App() {
  return (
    <Router>
        <Navbar height={50} />
        <Route path="/" exact component={Sift} />
        <Route path="/rankings" exact component={Rankings} />
        <Route path="/create" exact component={CreateRushee} />
    </Router>
  );
}

export default App;
