import * as React from 'react';
import './new-post.css';
import { client } from 'src/services/client';
import gql from 'graphql-tag';

class NewPostComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                body: ''
            },
            anonymous: false
        };
    }

    reset = () => {
        this.setState({
            post: {
                body: '',
                anonymous: false
            }
        });
    };

    render() {
        return (
            <div className="new-post">
                <div className="col">
                    <div className="row">
                        <input className="text-input" placeholder="What's up?" name="body" value={this.state.post.body} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="row">
                        <input type="checkbox" name="anonymous" checked={this.state.anonymous} onChange={this.handleAnonymousCheckboxChange}/> <label className="anonymous">Anonymous</label>
                    </div>
                </div>
                <div className="col right">
                    <button className="button-send" onClick={this.submit}>Send</button>
                </div>
            </div>
        );
    }

    handleInputChange = (event) => {
        const value = event.target.value;

        this.setState({ post: { ...this.state.post, [event.target.name]: value}});
    };

    handleAnonymousCheckboxChange = (event) => {
        const value = event.target.checked;

        this.setState({ anonymous: value });
    }

    submit = async() => {
        navigator.geolocation.getCurrentPosition(async(location) => {
            try {
                const response = await client.mutate({
                    variables: { 
                        post: this.state.post,
                        channelId: this.props.channel? this.props.channel.id: null,
                        anonymous: this.state.anonymous
                    },
                    mutation: gql(`
                    mutation CreatePost ($channelId: ID, $post: PostInput!, $anonymous: Boolean) {
                        createPost(channelId: $channelId, post: $post, anonymous: $anonymous) {
                            id,
                            body,
                            distance,
                            createdAt
                            owner {
                                uid
                                username
                            }
                            channel {
                                id
                                name
                            }
                        }
                    }
                    `),
                    context: {
                        location: {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }
                    }   
                });
            
                this.props.onNewPost && await this.props.onNewPost(response.data.createPost);
                this.reset();
            } catch (error) {
                console.log(error);
            } 
        });
    }
}

export default NewPostComponent;