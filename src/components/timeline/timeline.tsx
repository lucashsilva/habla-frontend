import * as React from 'react';
import NewPostComponent from '../../components/new-post/new-post';
import './timeline.css';
import { client } from 'src/services/client';
import gql from 'graphql-tag';
import { Loader, Segment, Icon, Header } from 'semantic-ui-react';
import Post from '../post/post';

class TimelineComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      posts: [],
      refreshing: false
    };
  }

  componentWillMount = async() => {
    this.refresh();
  }

  refresh = () => {
    this.setState({ refreshing: true });

    navigator.geolocation.getCurrentPosition(async(location) => {
      const response = await client.query<any>({
        query: gql(`
          {
            posts(radius: 1500000000000000, skip: 0, take: 10, channelId: ${this.channelId || null}) {
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
        posts: response.data.posts,
        refreshing: false
      });
    });
  };

  onNewPost = (post) => {
    this.setState({
      posts: [post, ...this.state.posts]
    });
  };

  get channelId() {
    return this.props && this.props.match && this.props.match && this.props.match.params.channelId;
  }

  public render() {
    const TimelineNewPostComponent = () => (<NewPostComponent onNewPost={this.onNewPost} channelId={this.channelId}/>);

    return (
      <div>
        <Segment placeholder={!this.state.refreshing && !this.state.posts.length}>
          {!this.state.refreshing && !this.state.posts.length?
          (<Segment.Inline>
              <Header icon>
              <Icon name='search'/>
              There's nothing here yet. Why don't you start something?
            </Header>
            <TimelineNewPostComponent/>
          </Segment.Inline>) :
          (<Segment.Inline>
            <TimelineNewPostComponent/>
            <div className="posts">
              {this.state.posts && this.state.posts.map(post => <Post key={post.id} post={post}/>)}
            </div>
            <Loader active={this.state.refreshing} inline="centered"/>
          </Segment.Inline>)}
        </Segment>
      </div>
    );
  }
}

export default TimelineComponent;
