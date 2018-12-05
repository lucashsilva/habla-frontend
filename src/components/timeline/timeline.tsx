import * as React from 'react';
import PostComponent from '../../components/post/post';
import NewPostComponent from '../../components/new-post/new-post';
import './timeline.css';

class TimelineComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  componentWillMount = async() => {
    await this.refresh();
  };

  refresh = async() => {
    // to do
  };

  public render() {
    return (
      <div>
        <NewPostComponent onNewPost={this.refresh}/>
        <div className="posts">
          {this.props.posts && this.props.posts.map(post => <PostComponent key={post.id} post={post}/>)}
        </div>
      </div>
    );
  }
}

export default TimelineComponent;
