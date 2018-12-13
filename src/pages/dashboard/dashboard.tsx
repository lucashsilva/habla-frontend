import * as React from 'react';
import './dashboard.css';
import TimelineComponent from '../../components/timeline/timeline';
import { Menu, Icon, Grid, Image } from 'semantic-ui-react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import ChannelListComponent from '../../components/channel-list/channel-list';

class DashboardPage extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Router>
        <Grid padded centered>
          <Grid.Column widescreen={2} largeScreen={3} computer={4} tablet={5}>
            <Image src={this.props.userProfile.photoURL || 'https://react.semantic-ui.com/images/avatar/large/molly.png'}/>
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
            <Route path="/timeline" component={TimelineComponent}/>
            <Route path="/channels" component={ChannelListComponent}/>
            <Route children path="/channel/:channelId" component={TimelineComponent}/>
          </Grid.Column>
        </Grid>
      </Router>
    );
  }
}

export default DashboardPage;
