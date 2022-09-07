import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage.js';
import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
