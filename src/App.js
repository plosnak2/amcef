import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from './pages/HomePage.js';
import React, { Component } from 'react';
import OneList from "./pages/OneList.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/list" element={<OneList />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
