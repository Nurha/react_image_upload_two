import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Upload from './views/image_upload_avatar';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider >
        <Router>
          <div>
            <Route exact path='/' component={Upload} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
