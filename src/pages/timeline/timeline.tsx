import * as React from 'react';
import PostComponent from '../../components/post/post';
import './timeline.css';
import * as moment from 'moment';

class TimelinePage extends React.Component {
  mockedPost = {
    body: 'This is the post body',
    createdAt: moment().subtract(5, 'minutes'),
    author: {
      name: 'Lucas Silva',
      username: 'lucassilva'
    }
  }
  
  posts = [this.mockedPost, this.mockedPost, this.mockedPost];

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="posts">
        {this.posts.map(post => <PostComponent post={this.mockedPost}/>)}
      </div>
    );
  }
}

export default TimelinePage;
