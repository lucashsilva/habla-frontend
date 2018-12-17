import * as React from 'react';
import './App.css';
import * as firebase from 'firebase';
import LoginPage from './pages/login/login';
import CreateProfilePage from './pages/create-profile/create-profile';
import { client } from './services/client';
import gql from 'graphql-tag';
import { Loader, Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import ChannelListComponent from './components/channel-list/channel-list';
import PostPage from './pages/post/post';
import TimelinePage from './pages/timeline/timeline';
import ProfilePage from './pages/profile/profile';
import SidebarComponent from './components/sidebar/sidebar';

class App extends React.Component<any,any> {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      userIsRegistered: false,
      ready: false
    };

    firebase.auth().onAuthStateChanged(async(user) => {
      try {
        this.setState({ user: user });

        if (!user) {
          localStorage.removeItem('userIsRegistered');
          return;
        }

        let userIsRegistered = localStorage.getItem('userIsRegistered');

        if (userIsRegistered === 'true') {
          this.setState({ userIsRegistered: true });
          return;
        }

        const response: any = await client.query({
          query: gql(`
            {
              profile(uid: "${user.uid}") {
                uid
              }
            }
          `),
          fetchPolicy: 'no-cache'
        });

        if (response.data.profile) {
          localStorage.setItem('userIsRegistered', 'true');
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ ready: true });
      }
    })
  }

  onProfileCreation = async(profile) => {
    this.setState({ userIsRegistered: true, ready: true });
  }

  public render() {
    if (!this.state.ready) return (<Loader active/>);
    
    if (this.state.user && this.state.userIsRegistered) {
      return (
        <Router>
          <Grid padded centered>
            <Grid.Column widescreen={2} largeScreen={3} computer={4} tablet={5}>
              <Switch>
                <Route path="/profile/:profileUid" exact render={(props) => (
                  <SidebarComponent profileUid={props.match.params.profileUid}/>
                )}/>
                <Route render={() => (
                  <SidebarComponent profileUid={firebase.auth().currentUser.uid}/>
                )}/>
              </Switch>
            </Grid.Column>
            <Grid.Column widescreen={8} largeScreen={7} computer={8}>
              <Switch>
                <Redirect exact from="/" to="/timeline" />
                <Route path="/timeline" exact component={TimelinePage} key="timeline"/>
                <Route path="/channels" exact component={ChannelListComponent} key="channels"/>
                <Route path="/channels/:channelId" exact component={TimelinePage} key="channel"/>
                <Route path="/posts/:postId" exact component={PostPage} key="post"/>
                <Route path="/profile" exact component={ProfilePage} key="own-profile"/>
                <Route path="/profile/:profileUid" exact component={ProfilePage} key="user-profile"/>
              </Switch>
            </Grid.Column>
          </Grid>
        </Router>
      )
    } else if (this.state.user && !this.state.userIsRegistered) {
      return <CreateProfilePage onCreation={this.onProfileCreation}/>;
    } else {
      return <LoginPage/>;
    }
  }
}

export default App;
