import * as React from 'react';
import './App.css';
import TimelinePage from './pages/timeline/timeline';
import * as firebase from 'firebase';
import LoginPage from './pages/login/login';

class App extends React.Component<any,any> {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      ready: false
    };

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ ready: true, user: user });
    })
  }

  public render() {
    if (!this.state.ready) return (<div>Loading...</div>);
    
    return this.state.user? <TimelinePage/>: <LoginPage/>;
  }
}

export default App;
