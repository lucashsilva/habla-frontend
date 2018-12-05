import * as React from 'react';
import './App.css';
import * as firebase from 'firebase';
import LoginPage from './pages/login/login';
import CreateProfilePage from './pages/create-profile/create-profile';
import { client } from './services/client';
import gql from 'graphql-tag';
import DashboardPage from './pages/dashboard/dashboard';


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

        const response = await client.query({
          query: gql(`
            {
              profile(uid: "${user.uid}") {
                uid
                name
                username
                bio
                website
                phone
                gender
              }
            }
          `),
          fetchPolicy: 'no-cache'
        });

        const profile = (response.data as any).profile;
  
        this.setState({ userProfile: profile });
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
      return <DashboardPage/>;
    } else if (this.state.user && !this.state.userProfile) {
      return <CreateProfilePage onCreation={this.onProfileCreation}/>;
    } else {
      return <LoginPage/>;
    }
  }
}

export default App;
