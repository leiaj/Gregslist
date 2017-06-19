import React, { Component } from 'react';
import './App.css';
import PostsContainer from './components/PostsContainer'


class App extends Component {
  render() {
    return (
      <div id='main-container'>
      <PostsContainer />
      </div>
    );
  }
}

export default App;
