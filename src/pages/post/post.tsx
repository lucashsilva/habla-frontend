import * as React from 'react';
import './post.css';
import PostComponent from 'src/components/post/post';
import { Loader, Segment } from 'semantic-ui-react';
import { client } from 'src/services/client';
import gql from 'graphql-tag';

class PostPage extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
      post: null,
      loading: true
    }
  }

  componentWillMount = async() => {
    await this.refresh();
  }

  refresh = () => {
    return new Promise(async(resolve, reject) => {
      this.setState({ loading: true });

      navigator.geolocation.getCurrentPosition(async(location) => {
        let response;
  
        try {
          response = await client.query<any>({
            query: gql(`
              {
                post(id: ${this.props.match && this.props.match.params && this.props.match.params.postId}) {
                  id
                  body
                  distance
                  createdAt
                  anonymous
                  commentsCount
                  rate
                  profilePostVote {
                    type
                  }
                  owner {
                    uid
                    username
                    name
                    photoURL
                  }
                  channel {
                    id
                    name
                  }
                  comments {
                    id
                    createdAt
                    body
                    distance
                    owner {
                      uid
                      name
                      username
                      photoURL
                    }
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

          this.setState({ post: response.data.post, loading: false });
          resolve();
        } catch (error) {
          reject(error);
          console.log(error);
        }
      });
    });
  }

  public render() {
    return (
      <Segment>
        {this.state.post? <PostComponent post={this.state.post} showComments={true}/>: <Loader active inline="centered"/>}
      </Segment>
    );
  }
}

export default PostPage;
