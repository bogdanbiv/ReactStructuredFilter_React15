import React, { Component } from 'react';
import './css/griddle.css';
import './css/style.css';

import ExampleTable from './react-structured-filter/example/ExampleTable.js';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                react-structured-filter demo
              </a>
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-body">
            <h2>Example stock data</h2>
            <ExampleTable />

            <hr />

            <p>
              <a href="http://summitroute.github.io/react-structured-filter/">
                Documentation
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
