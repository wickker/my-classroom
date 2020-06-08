import React from 'react';
import { hot } from 'react-hot-loader';
import Navigation from "./components/nav";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
      </div>
    );
  }
}

export default hot(module)(App);
