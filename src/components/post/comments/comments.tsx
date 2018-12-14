import * as React from 'react';
import './comments.css';
import { Comment } from 'semantic-ui-react';
import NewCommentComponent from '../new-comment/new-comment';
import * as moment from 'moment';

class PostCommentsComponent extends React.Component<PostCommentsComponentProps, PostCommentsComponentState> {
  constructor(props: PostCommentsComponentProps) {
    super(props);

    this.state = {
      comments: this.props.comments
    };
  }

  onNewComment = (comment) => {
    this.setState({
      comments: [comment, ...this.state.comments]
    });
  }

  render() {
    const { comments } = this.state;

    return (
      <Comment.Group className="comments">
        <NewCommentComponent postId={this.props.postId} onNewComment={this.onNewComment}/>
  
        { comments.map(c => (
        <Comment>
          <Comment.Avatar src={c.owner && c.owner.photoURL || 'https://react.semantic-ui.com/images/avatar/large/molly.png'} />
          <Comment.Content>
            <Comment.Author as='a'>{ c.owner && c.owner.name || 'anonymous' }</Comment.Author>
            <Comment.Metadata>
              { moment(c.createdAt).fromNow() } • <span className="distance">{ c.distance }</span>
            </Comment.Metadata>
            <Comment.Text>{ c.body }</Comment.Text>
            {/* <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions> */}
          </Comment.Content>
        </Comment>
      )) }
    </Comment.Group>
    );
  }
}

interface PostCommentsComponentProps {
  postId: number;
  comments: any[];
}

interface PostCommentsComponentState {
  comments: any[];
}

export default PostCommentsComponent;