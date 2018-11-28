import * as React from 'react';
import './App.css';
import TimelinePage from './pages/timeline/timeline';
import * as firebase from 'firebase';
import LoginPage from './pages/login/login';
import CreateProfilePage from './pages/create-profile/create-profile';
import { api } from './services/api';


class App extends React.Component<any,any> {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      ready: false
    };

    firebase.auth().onAuthStateChanged(async(user) => {
      try {
        this.setState({ user: user });

        if (!user) return; 

        this.setState({ ready: false });

        let response = await api.get("profiles/self");
  
        this.setState({ userProfile: response.data });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ ready: true });
      }
    })
  }

  onProfileCreation = async(profile) => {
    this.setState({ userProfile: profile, ready: true });
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
