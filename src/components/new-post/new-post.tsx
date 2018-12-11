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
                <Input label={<Button primary onClick={this.submit}>Send</Button>}
                       labelPosition='right'
                       placeholder="What's up?"
                       name='body'
                       value={this.state.post.body} 
                       onChange={this.handleInputChange}/>
                <Checkbox type="checkbox" 
                          name="anonymous" 
                          checked={this.state.anonymous} 
                          onChange={this.handleAnonymousCheckboxChange}
                          label="Anonymous"
                          className="anonymous-checkbox"/>
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
                            commentsCount
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