import * as React from 'react';
import './sidebar.css';
import { Menu, Image, Icon, Loader } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { client } from 'src/services/client';
import gql from 'graphql-tag';
import * as firebase from 'firebase';

class SidebarComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      profileUid: props.profileUid,
      loading: false,
      profile: null
    };
  }

  componentDidMount = async() => {
    await this.refresh();
  }

  componentDidUpdate = async() => {
    if (this.props.profileUid && this.props.profileUid !== this.state.profileUid) {
      this.setState({ profileUid: this.props.profileUid }, async() => await this.refresh());
    }
  }

  refresh = async() => {
    let profileUid = this.state.profileUid;

    if (profileUid) {
      this.setState({ loading: true });

      try {
        const response: any = await client.query({
          query: gql(`
            {
              profile(uid: "${profileUid}") {
                uid
                name
                username
                photoURL
              }
            }
          `),
          fetchPolicy: 'no-cache'
        });

        this.setState({
          profile: response.data.profile
        });
      } catch (error) {
        console.log(error);
      }

      this.setState({ loading: false });
    }
  }

  get isOwnProfile() {
    return this.state.profileUid === firebase.auth().currentUser.uid;
  }

  public render() {
    return this.state.loading? <Loader active inline="centered"/> : (
      <div>
        <Image rounded src={this.state.profile && this.state.profile.photoURL || 'https://react.semantic-ui.com/images/avatar/large/molly.png'}/>
        <Menu vertical fluid>
          <Menu.Item as={NavLink} to="/timeline">
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Item as={NavLink} to="/channels">
            <Icon name='hashtag' />
            Channels
          </Menu.Item>
          { this.isOwnProfile? <Menu.Item link onClick={() => firebase.auth().signOut()}>
            <Icon name='sign out alternate' />
            Logout
          </Menu.Item>: null }
        </Menu>
      </div>);
  }
}

export default SidebarComponent;
