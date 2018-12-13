import * as React from 'react';
import './post.css';
import { Card, Icon, Image } from 'semantic-ui-react';
import * as moment from 'moment';

class PostComponent extends React.Component<PostComponentProps, PostComponentState> {
    constructor(props: PostComponentProps) {
        super(props);
    }

    render() {
        const post = this.props.post;

        return (
            <Card className="post">
                <Card.Content className="post-content">
                    <Card.Header className="post-header">
                        <Image floated='left' 
                               size='mini' 
                               className="avatar"
                               src={post.owner && post.owner.photoURL || 'https://react.semantic-ui.com/images/avatar/large/molly.png'}/>
                        {post.owner? post.owner.username: 'anonymous'}
                        <span className="post-distance">{ post.distance }</span>
                    </Card.Header>
                    <Card.Description className="post-body">
                        { post.body }
                    </Card.Description>
                </Card.Content>
                <Card.Content extra className="post-footer">
                <a>
                    {moment(post.createdAt).fromNow()}
                </a>
                &nbsp;&nbsp;&nbsp;
                <a>
                    <Icon name='comments' />{ post.commentsCount }
                </a>
                &nbsp;&nbsp;&nbsp;
                {  post.channel? (<a><b>#{ post.channel.name }</b> </a>) : null }
                </Card.Content>
            </Card>
        );
    }
}

class PostComponentProps {
    post: any;
}

class PostComponentState {

}

export default PostComponent;