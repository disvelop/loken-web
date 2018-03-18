import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Search from 'async!../routes/search';
import Profile from 'async!../routes/profile';

if (module.hot) {
  require('preact/debug');
}

export default class App extends Component {
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Router onChange={this.handleRoute}>
          <Search path="/" />
          <Profile path="/:region/:realm/:character" />
        </Router>
      </div>
    );
  }
}
