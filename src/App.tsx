import * as React from 'react';
import './App.css';
import TimelinePage from './pages/timeline/timeline';
import * as firebase from 'firebase';
import LoginPage from './pages/login/login';
import CreateProfilePage from './pages/create-profile/create-profile';


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

  onProfileCreation = async(profile) => {
    this.setState({ userProfile: profile });
  }

  public render() {
    if (!this.state.ready) return (<div>Loading...</div>);
    
    if (this.state.user && this.state.userProfile) {
      return <TimelinePage/>;
    } else if (this.state.user && !this.state.userProfile) {
      return <CreateProfilePage onCreation={this.onProfileCreation}/>;
    } else {
      return <LoginPage/>;
    }
  }
}

export default App;
