import * as React from 'react';
import './new-post.css';
import { client } from 'src/services/client';
import gql from 'graphql-tag';
import { Button, Input, Checkbox } from 'semantic-ui-react';

class NewPostComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            post: {
                body: ''
            },
            anonymous: false,
            posting: false
        };
    }

    reset = () => {
        this.setState({
            post: {
                body: ''
            },
            anonymous: false
        });
    };

    render() {
        return (
            <div className="new-post">
                <Input label={<Button primary onClick={this.submit} disabled={this.state.posting} loading={this.state.posting}>Send</Button>}
                       labelPosition='right'
                       placeholder="What's up?"
                       name='body'
                       value={this.state.post.body} 
                       onChange={this.handleInputChange}
                       disabled={this.state.posting}/>
                <Checkbox type="checkbox" 
                          name="anonymous" 
                          checked={this.state.anonymous} 
                          onChange={this.handleAnonymousCheckboxChange}
                          label="Anonymous"
                          className="anonymous-checkbox"
                          disabled={this.state.posting}/>
            </div>
        );
    }

    handleInputChange = (event) => {
        const value = event.target.value;

        this.setState({ post: { ...this.state.post, [event.target.name]: value}});
    };

    handleAnonymousCheckboxChange = () => {
        this.setState({ anonymous: !this.state.anonymous });
    }

    submit = async() => {
        this.setState({ posting: true });

        navigator.geolocation.getCurrentPosition(async(location) => {
            try {
                const response = await client.mutate({
                    variables: { 
                        post: this.state.post,
                        channelId: this.props.channelId || null,
                        anonymous: this.state.anonymous
                    },
                    mutation: gql(`
                    mutation CreatePost ($channelId: ID, $post: PostInput!, $anonymous: Boolean) {
                        createPost(channelId: $channelId, post: $post, anonymous: $anonymous) {
                            id,
                            body,
                            distance,
                            createdAt
                            commentsCount
                            owner {
                                uid
                                username
                                photoURL
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

                this.setState({ posting: false });
            
                this.props.onNewPost && await this.props.onNewPost(response.data.createPost);

                this.reset();
            } catch (error) {
                console.log(error);
            } 
        });
    }
}

export default NewPostComponent;