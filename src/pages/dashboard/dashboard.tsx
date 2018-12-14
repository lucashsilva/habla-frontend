import * as React from 'react';
import './dashboard.css';
import TimelineComponent from '../../components/timeline/timeline';
import { Menu, Icon, Grid, Image } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, NavLink, Redirect, Switch } from "react-router-dom";
import ChannelListComponent from '../../components/channel-list/channel-list';
import PostPage from '../post/post';

class DashboardPage extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Router>
        <Grid padded centered>
          <Grid.Column widescreen={2} largeScreen={3} computer={4} tablet={5}>
            <Image rounded src={this.props.userProfile.photoURL || 'https://react.semantic-ui.com/images/avatar/large/molly.png'}/>
            <Menu vertical fluid>
              <Menu.Item as={NavLink} to="/timeline">
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item as={NavLink} to="/channels">
                <Icon name='hashtag' />
                Channels
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column widescreen={8} largeScreen={7} computer={8}>
            <Switch>
              <Redirect exact from="/" to="/timeline" />
              <Route path="/timeline" component={TimelineComponent}/>
              <Route path="/channels" exact component={ChannelListComponent}/>
              <Route path="/channels/:channelId" component={TimelineComponent}/>
              <Route path="/posts/:postId" component={PostPage}/>
            </Switch>
          </Grid.Column>
        </Grid>
      </Router>
    );
  }
}

export default DashboardPage;
