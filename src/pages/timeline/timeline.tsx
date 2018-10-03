import * as React from 'react';
import PostComponent from '../../components/post/post';
import NewPostComponent from '../../components/new-post/new-post';
import './timeline.css';
import * as moment from 'moment';

class TimelinePage extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    let posts = [{
        key: 1,
        body: 'Hello world!',
        createdAt: moment().subtract(5, 'minutes'),
        author: {
          name: 'Lucas Silva',
          username: 'lucas'
        }
      },
      {
        key: 2,
        body: 'This is the post body',
        createdAt: moment().subtract(8, 'minutes'),
        author: {
          name: 'Mainara',
          username: 'mainara'
        }
      },
      {
        key: 3,
        body: 'Teste',
        createdAt: moment().subtract(7, 'minutes'),
        author: {
          name: 'Vinicius',
          username: 'vinicius'
        }
      }
    ]

    this.state = {
        posts: posts
    };
  }

  public render() {
    return (
      <div>
        <NewPostComponent/>
        <div className="posts">
            {this.state.posts.map(post => <PostComponent post={post}/>)}
        </div>
      </div>
    );
  }
}

export default TimelinePage;
