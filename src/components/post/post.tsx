import * as React from 'react';
import './post.css';
import * as moment from 'moment';

class PostComponent extends React.Component<PostComponentProps, PostComponentState> {
    constructor(props: PostComponentProps) {
        super(props);
    }

    render() {
        const post = this.props.post;

        return (
        <div className="post">
            <div className="post-header">
                <span className="username">@{post.owner? post.owner.username: 'anonymous'}</span>
                <span className="distance">{post.distance}</span>
            </div>
            <div className="post-body">
                {post.body}
            </div>
            <span className="time-ago">{moment(post.createdAt).fromNow()}</span>
        </div>
        );
    }
}

class PostComponentProps {
    post: any;
}

class PostComponentState {

}

export default PostComponent;