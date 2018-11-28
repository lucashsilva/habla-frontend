import * as React from 'react';
import PostComponent from '../../components/post/post';
import NewPostComponent from '../../components/new-post/new-post';
import './timeline.css';
import { api } from '../../services/api';

class TimelinePage extends React.Component<any, any> {

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
      let response = await api.get('posts', {
        params: {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
          radius: 1000000
        }
      });
  
      this.setState({
        posts: response.data
      });
    });
  };

  public render() {
    return (
      <div>
        <NewPostComponent onNewPost={this.refresh}/>
        <div className="posts">
            {this.state.posts.map(post => <PostComponent key={post.id} post={post}/>)}
        </div>
      </div>
    );
  }
}

export default TimelinePage;
