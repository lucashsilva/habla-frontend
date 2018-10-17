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
    let response = await api.get('posts');

    this.setState({
      posts: response.data
    });
  };

  public render() {
    return (
      <div>
        <NewPostComponent/>
        <div className="posts">
            {this.state.posts.map(post => <PostComponent key={post.id} post={post}/>)}
        </div>
      </div>
    );
  }
}

export default TimelinePage;
