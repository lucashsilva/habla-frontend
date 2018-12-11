import * as React from 'react';
import PostComponent from '../../components/post/post';
import NewPostComponent from '../../components/new-post/new-post';
import './timeline.css';
import { client } from 'src/services/client';
import gql from 'graphql-tag';

class TimelineComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentWillMount = async() => {
    await this.refresh();
  }

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

  onNewPost = (post) => {
    this.setState({
      posts: [post, ...this.state.posts]
    });
  };

  public render() {
    return (
      <div>
        <NewPostComponent onNewPost={this.onNewPost}/>
        <div className="posts">
          {this.state.posts && this.state.posts.map(post => <PostComponent key={post.id} post={post}/>)}
        </div>
      </div>
    );
  }
}

export default TimelineComponent;
