import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    console.log('initialize')
    this.state = {
      rows: [
        <p key="1">This is a row 0</p>,
        <p key="2">This is a row 0</p>,
      ]

    }
  }
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            <img src="tmdb-logo.png" width="80" height="80" className="d-inline-block align-top mr-sm-2" alt="The Movie DB Logo" />
            <span className="display-4">
              MovieDB API
            </span>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control form-control-lg mr-sm-2" type="search" placeholder="Enter search term" aria-label="Search" />
              <button className="btn btn-outline-success btn-lg my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <div className="container">
          {this.state.rows}

        </div>
      </div>
    );
  }
}

export default App;
