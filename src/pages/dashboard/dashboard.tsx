import * as React from 'react';
import './dashboard.css';
import { client } from 'src/services/client';
import gql from 'graphql-tag';
import TimelineComponent from 'src/components/timeline/timeline';

class DashboardPage extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
        posts: []
    };
  }

  componentWillMount = async() => {
    await this.refresh();
  };

  refresh = async() => {
    navigator.geolocation.getCurrentPosition(async(location) => {
      const response = await client.query<any>({
        query: gql(`
          {
            posts(radius: 1500000000000000, skip: 0, take: 10) {
              id
              body
              distance
              createdAt
              commentsCount
              rate
              profilePostVote {
                type
              }
              owner {
                uid
                username
                photoURL
              }
              channel {
                id
                name
              }
            }
          }
        `),
        context: {
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }
        },
        fetchPolicy: 'no-cache'
      });
  
      this.setState({
        posts: response.data.posts
      });
    });
  };

  public render() {
    return (
      <TimelineComponent posts={this.state.posts}/>
    );
  }
}

export default DashboardPage;
