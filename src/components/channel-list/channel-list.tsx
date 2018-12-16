import * as React from 'react';
import './channel-list.css';
import { client } from 'src/services/client';
import gql from 'graphql-tag';
import { Segment, List, Header, Loader, Modal, Icon } from 'semantic-ui-react';
import { NavLink } from "react-router-dom";
import NewChannelComponent from '../new-channel/new-channel';

class ChannelListComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      channels: [],
      refreshing: false
    };
  }

  componentWillMount = async() => {
    await this.refresh();
  }

  refresh = async() => {
    this.setState({ refreshing: true });

    const response = await client.query<any>({
      query: gql(`
        {
          channels {
            id
            name
          }
        }
      `),
      fetchPolicy: 'no-cache'
    });

    this.setState({
      channels: response.data.channels,
      refreshing: false
    });
  };

  public render() {
    return (
      <Segment className="channels">
        <Header>
          Channels
          <Modal trigger={<Icon link name="add" className="new-channel"/>} basic size='small'>
            <NewChannelComponent onNewChannel={() => undefined}/>
          </Modal>
        </Header>
        <Loader active={this.state.refreshing} inline="centered"/>
        <List selection verticalAlign='middle'>
        {this.state.channels && this.state.channels.map(channel => (
          <List.Item key={channel.id} as={NavLink} to={`/channels/${channel.id}`}>
            <List.Content>
              <List.Header>#{channel.name}</List.Header>
            </List.Content>
          </List.Item>))}
        </List>
      </Segment>
    );
  }
}

export default ChannelListComponent;
