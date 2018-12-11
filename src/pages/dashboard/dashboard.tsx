import * as React from 'react';
import './dashboard.css';
import TimelineComponent from 'src/components/timeline/timeline';
import { Menu, Icon, Grid, Image } from 'semantic-ui-react';
import * as firebase from 'firebase';

class DashboardPage extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Grid padded centered>
        <Grid.Column widescreen={2} largeScreen={3} computer={4} tablet={5}>
          <Image src={firebase.auth().currentUser.photoURL || 'https://react.semantic-ui.com/images/avatar/large/molly.png'}/>
          <Menu vertical fluid>
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='hashtag' />
              Channels
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column widescreen={8} largeScreen={7} computer={8}>
          <TimelineComponent/>
        </Grid.Column>
      </Grid>
    );
  }
}

export default DashboardPage;
