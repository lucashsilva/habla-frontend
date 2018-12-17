import * as React from 'react';
import './post.css';
import { Card, Icon, Image, Loader } from 'semantic-ui-react';
import * as moment from 'moment';
import { NavLink } from "react-router-dom";
import PostCommentsComponent from './comments/comments';
import gql from 'graphql-tag';
import { client } from 'src/services/client';

class PostComponent extends React.Component<PostComponentProps, PostComponentState> {
    constructor(props: PostComponentProps) {
        super(props);

        this.state = { 
            post: this.props.post,
            voting: false
        }
    }

    vote = async(type: "UP" | "DOWN") => {
        if (!(type === "UP" || type === "DOWN")) return;

        this.setState({ post: { ... this.state.post }, voting: true });

        try {
            const response = await client.mutate({
            variables: { 
                postId: this.state.post.id,
                type: type
            },
            mutation: gql(`
                mutation VotePost ($postId: ID!, $type: PostVoteType!) {
                    vote(postId: $postId, type: $type) {
                        type
                        post {
                            id
                        }
                        profile {
                            uid
                            photoURL
                        }
                        post {
                            rate
                        }
                    }
                }
            `)
            });

            this.setState({
                post: {
                    ...this.state.post, 
                    rate: response.data.vote.post.rate,
                    profilePostVote: response.data.vote
                }
            });
        } catch (error) {
            console.log(error);
        }

        this.setState({
            voting: false
        });
    }
    

    render() {
        const post = this.state.post;

        return (
            <div>
                <Card className="post">
                    <Card.Content className="post-content">
                        <Card.Header className="post-header">
                            <NavLink to={post.owner? `/profile/${post.owner.uid}`: '#'} exact className="header-link">
                                <Image floated='left' 
                                       size='mini' 
                                       className="avatar"
                                       src={post.owner && post.owner.photoURL || 'https://semantic-ui.com/images/avatar2/large/matthew.png'}/>
                                {post.owner? post.owner.username: 'anonymous'}
                            </NavLink>
                            
                            <div className="thumbs">
                                <Icon link name="chevron up" size="big" onClick={() => this.vote("UP")}/>
                                { this.state.voting? <Loader inline active size="tiny"/>: post.rate || 0 }
                                <Icon link name="chevron down" size="big" onClick={() => this.vote("DOWN")}/>
                            </div>
                        </Card.Header>
                        <Card.Description className="post-body">
                            { post.body }
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra className="post-footer">
                    <NavLink to={`/posts/${post.id}`}>
                        { post.distance }
                        &nbsp;
                        •
                        &nbsp;
                        {moment(post.createdAt).fromNow()}
                    
                        &nbsp;&nbsp;&nbsp;
                    
                        <Icon name='comments' />{ post.commentsCount }
                    </NavLink>
                    &nbsp;&nbsp;&nbsp;
                    {  post.channel? (<a><b>#{ post.channel.name }</b> </a>) : null }
                    </Card.Content>
                </Card>
                {
                    this.props.showComments? <PostCommentsComponent postId={post.id} comments={post.comments}/>: null
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
    post: any;
    voting: boolean;
}

export default PostComponent;