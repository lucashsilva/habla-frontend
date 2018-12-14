import * as React from 'react';
import './post.css';
import { Card, Icon, Image } from 'semantic-ui-react';
import * as moment from 'moment';
import { NavLink } from "react-router-dom";
import PostCommentsComponent from './comments/comments';

class PostComponent extends React.Component<PostComponentProps, PostComponentState> {
    constructor(props: PostComponentProps) {
        super(props);
    }

    render() {
        const post = this.props.post;

        return (
            <div>
                <Card className="post">
                    <Card.Content className="post-content">
                        <Card.Header className="post-header">
                            <Image floated='left' 
                                size='mini' 
                                className="avatar"
                                src={post.owner && post.owner.photoURL || 'https://react.semantic-ui.com/images/avatar/large/molly.png'}/>
                            {post.owner? post.owner.username: 'anonymous'}
                            <NavLink to={`/posts/${post.id}`} className="post-distance">
                                { post.distance }
                            </NavLink>
                        </Card.Header>
                        <Card.Description className="post-body">
                            { post.body }
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra className="post-footer">
                    <NavLink to={`/posts/${post.id}`}>
                        {moment(post.createdAt).fromNow()}
                    
                        &nbsp;&nbsp;&nbsp;
                    
                        <Icon name='comments' />{ post.commentsCount }
                    </NavLink>
                    &nbsp;&nbsp;&nbsp;
                    {  post.channel? (<a><b>#{ post.channel.name }</b> </a>) : null }
                    </Card.Content>
                </Card>
                {
                    this.props.showComments? <PostCommentsComponent postId={this.props.post.id} comments={post.comments}/>: null
                }
            </div>
        );
    }
}

interface PostComponentProps {
    post: any;
    showComments?: boolean;
}

interface PostComponentState {

}

export default PostComponent;